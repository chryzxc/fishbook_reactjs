import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import storyimage from "../assets/2.jpg";
import profile from "../assets/1.jpg";
import ReactRoundedImage from "react-rounded-image";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineSend,
} from "react-icons/ai";
import { TiThumbsUp } from "react-icons/ti";
import db from "../others/firebase";
import {
  ref,
  set,
  push,
  getDatabase,
  child,
  get,
  equalTo,
  orderByChild,
  onValue,
  update,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  updateChildren,
  remove,
} from "firebase/database";
import { UserContext } from "../context/UserContext";
import { format } from "date-fns";
import Comments from "./Comments";

const Post = styled.div`
  background-color: white;
  margin: auto;
  height: auto;
  width: 80vh;
  min-height: auto;
  min-width: 80vh;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  width: auto;
`;

const RowBottom = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  width: auto;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  justify-content: space-between;
`;

const Name = styled.p`
  font-weight: bold;
  margin-top: -2px;
  font-size: 14px;
  margin-left: 10px;
  text-align: left;
`;

const Time = styled.p`
  align-self: flex-start;
  text-align: start;
  margin-left: 10px;
`;

const Caption = styled.p`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 15px;
  text-align: justify;
`;

const PostImage = styled.img`
  height: auto;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const NumberOfLikes = styled.p`
  text-align: end;
  justify-self: end;
`;

const Divider = styled.hr`
  border-top: 1pt solid #bbb;
  margin-left: 20px;
  margin-right: 20px;
`;

const Posts = ({ post }) => {
  const dbRef = ref(db);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [numOfReacts, setNumOfReacts] = useState(0);
  const [reactors, setReactors] = useState([]);
  const [reacted, setReacted] = useState(false);

  const { user } = useContext(UserContext);

  const [myComment, setMyComment] = useState("");
  const [comments, setComments] = useState([]);
  const [numOfComments, setNumOfComments] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [postUpdate, setPostUpdate] = useState(0);

  const postRef = ref(db, "posts/" + post.post_id);

  // onChildAdded(postRef, (data) => {
  //   get(child(dbRef, `posts/${post.post_id}`))
  //     .then((snapshot) => {
  //       console.log("listening");
  //       if (snapshot.exists()) {
  //         likes=0;
  //         snapshot.val().liked_users.forEach((child) => {
  //           likes += 1;
  //         });

  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // });

  // onChildChanged(postRef, (data) => {
  //   // setCommentValues(postElement, data.key, data.val().text, data.val().author);
  // });

  // onChildRemoved(postRef, (data) => {
  //   // deleteComment(postElement, data.key);
  // });

  useEffect(() => {
    // USER INFO
    get(child(dbRef, `users/${post.user_id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFirstname(snapshot.val().firstname);
          setLastname(snapshot.val().lastname);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    //INDIVIDUAL POST DATA
    get(child(dbRef, `posts/${post.post_id}/liked_users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let reacts = 0;
          let reactors = [];
          snapshot.forEach((data) => {
            reactors.push(data.key);
            reacts += 1;
          });
          setReactors(reactors);
          setNumOfReacts(reacts);

          setReacted(reactors.includes(user.id));
        } else {
          setReacted(false);
          setNumOfReacts(0);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    //Comments
    get(child(dbRef, `posts/${post.post_id}/comments`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let comments = [];
          let numOfComments = 0;
          snapshot.forEach((data) => {
            const commentDetails = {
              comment_id: data.key,
              comment: data.val().comment,
              date_posted: data.val().date_posted,
              user_id: data.val().user_id,
            };

            comments.push(commentDetails);
            numOfComments +=1;
          });
          setComments(comments);
          setNumOfComments(numOfComments);
          console.log("comments" +comments);

        } else {
          setNumOfComments(0);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postUpdate]);

  const UpdatePost = () => {
    const postRef = ref(db, "posts/" + post.post_id);
  };

  const handleReactPost = () => {
    if (reacted) {
      remove(ref(db, "posts/" + post.post_id + "/liked_users/" + user.id));
    } else {
      update(ref(db, "posts/" + post.post_id + "/liked_users/" + user.id), {
        date_reacted: new Date().getTime(),
      });
    }
    setPostUpdate(postUpdate + 1);
    console.log(postUpdate);
  };

  const handleCommentPost = () => {
    if (showCommentBox) {
      setShowCommentBox(!showCommentBox);
      console.log("comment box hidden");
    } else {
      setShowCommentBox(!showCommentBox);
      console.log("comment box displayed");
    }
  };

  const handleCommentListener = (e) => {
    setMyComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();

    const commentData = {
      user_id: user.id,
      comment: myComment,
      date_posted: new Date().getTime(),
    };

    const dbRef = ref(db, `posts/${post.post_id}/comments`);
    const newComment = push(dbRef);

    set(newComment, commentData)
      .then(() => {
        setMyComment("");
        console.log("comment submitted");
        //handleRefresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Post>
      <RowBottom className="pt-4">
        <Row>
          <div>
            <ReactRoundedImage
              image={profile}
              roundedSize="0"
              imageWidth="40"
              imageHeight="40"
            ></ReactRoundedImage>
          </div>
          <div>
            <Name>{firstname + " " + lastname}</Name>
            <Time className="text-gray-600">
              {" "}
              {format(
                new Date(post.date_posted),
                "hh:m a • MMM dd • eee"
              ).toString()}
            </Time>
          </div>
        </Row>

        <div>
          <h1>Not friends</h1>
        </div>
      </RowBottom>
      <Caption className="text-gray-600 mb-3">{post.caption}</Caption>

      <PostImage src={storyimage} alt="post"></PostImage>

      {numOfReacts ? (
        <div>
          <RowBottom className="mt-1">
            <button className=" text-medium text-[#1877f2] p-1.5" disabled>
              {reacted ? (
                <div className="flex flex-row">
                  <AiFillLike className="h-5 w-5" />
                  <p className="text-sm ml-1 font-semibold">
                    You and {numOfReacts - 1} others
                  </p>
                </div>
              ) : (
                <div className="flex flex-row">
                  <AiFillLike className="h-5 w-5" />
                  <p className="text-sm ml-1 font-semibold text-center self-center">
                    {numOfReacts}
                  </p>
                </div>
              )}
            </button>
            <div className="self-center mr-3 ">
              {/* <NumberOfLikes className=" text-gray-600 text-medium">
            {numOfReacts} likes
          </NumberOfLikes> */}
            </div>
          </RowBottom>

          <Divider className="mt-[-6px]"></Divider>
        </div>
      ) : (
        ""
      )}

      <div className="flex flex-row justify-around  ml-5 mr-5 mt-1 mb-1 text-neutral-500 ">
        {reacted ? (
          <div
            className="flex flex-row text-[#1877f2] justify-center w-[100%] hover:bg-[#E4E6E9] rounded-xl p-2"
            onClick={handleReactPost}
          >
            <AiFillLike className="h-7 w-7" />
            <label className="ml-1 self-center text-[15px] font-semibold  text-[#1877f2]">
              Liked
            </label>
          </div>
        ) : (
          <div
            className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9]  rounded-xl p-2"
            onClick={handleReactPost}
          >
            <AiOutlineLike className="h-7 w-7" />
            <label className="ml-1 self-center text-[15px] font-semibold">
              Like
            </label>
          </div>
        )}

        <div
          className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9]  rounded-xl p-2"
          onClick={handleCommentPost}
        >
          <AiOutlineMessage className="h-7 w-7" />
          <label className="ml-1 self-center text-[15px] font-semibold">
            Comment
          </label>
        </div>

        <div className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9]  rounded-2xl p-2 ">
          <AiOutlineRetweet className="h-7 w-7" />
          <label className="ml-1 self-center text-[15px] font-semibold">
            Share
          </label>
        </div>
      </div>

      {showCommentBox ? (
        <div>
          <div>
            <Divider className="mt-1"></Divider>
            <div className="p-4 flex flex-row">
              <div className="self-center">
                <ReactRoundedImage
                  image={profile}
                  roundedSize="0"
                  imageWidth="40"
                  imageHeight="40"
                ></ReactRoundedImage>
              </div>

              {myComment ? (
                <div className="ml-3 w-[100%] pr-3 flex flex-row rounded-3xl bg-[#F0F2F5] border-transparent">
                  <input
                    className="ml-3 w-[100%] rounded-3xl bg-[#F0F2F5] border-transparent placeholder-neutral-500 "
                    onChange={(e) => {
                      handleCommentListener(e);
                    }}
                    value={myComment}
                  ></input>
                  <div
                    className="flex flex-row p-2 self-center mr-[-5px]  text-neutral-600 rounded-full"
                    onClick={submitComment}
                  >
                    <p className="self-center mr-1 font-bold">Send</p>
                    <AiOutlineSend className="h-6 w-6"></AiOutlineSend>
                  </div>
                </div>
              ) : (
                <div className="w-[100%] pr-3">
                  <input
                    className="pl-5 ml-3 w-[100%] rounded-3xl bg-[#F0F2F5] border-transparent placeholder-neutral-500 hover:bg-[#E4E6E9]"
                    placeholder="Write a comment..."
                    onChange={(e) => {
                      handleCommentListener(e);
                    }}
                    value={myComment}
                  ></input>
                </div>
              )}
            </div>
          </div>
          {comments && comments.map((comment) =>  <Comments comment={comment}></Comments>)}
      
      
        </div>
      ) : (
        ""
      )}
    </Post>
  );
};

export default Posts;
