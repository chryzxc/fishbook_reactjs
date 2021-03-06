import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import Modal from "react-modal";
import CreatePost from "./CreatePost";

import ReactRoundedImage from "react-rounded-image";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineSend,
} from "react-icons/ai";
import { FaGlobeAsia } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import { TiThumbsUp } from "react-icons/ti";
import { db, storage } from "../config/firebase";
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
import { UserContext } from "../contexts/UserContext";
import {
  format,
  formatDistance,
  subDays,
  formatDistanceStrict,
} from "date-fns";
import Comments from "./Comments";
import DateFormat from "../utils/DateFormat";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { useNavigate } from "react-router-dom";
import {
  useGetPostData,
  useGetUserInfo,
  useGetUserProfilePicture,
} from "../hooks/useGetData";
import View from "./View";
import SharedPostContent from "./SharedPostContent";

const Post = styled.div`
  background-color: white;
  margin: auto;
  height: auto;
  width: 31rem;
  min-height: auto;
  min-width: 31rem;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: ${(props) => props.box_value};
  font-size: 13px;
  /* box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19); */
  padding-bottom: 5px;
  padding-top: 1px;
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
  // margin-top: -2px;
  font-size: 14px;
  margin-left: 10px;
  text-align: left;
`;

const TimeLabel = styled.p`
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

const Posts = ({ notView, post, handleRefresh, setViewData, setShowView }) => {
  const dbRef = ref(db);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [numOfReacts, setNumOfReacts] = useState(0);
  const [numOfShare, setNumOfShares] = useState(0);
  const [reactors, setReactors] = useState([]);
  const [reacted, setReacted] = useState(false);

  const { user, userContextId } = useContext(UserContext);

  const [myComment, setMyComment] = useState("");
  const [comments, setComments] = useState([]);
  const [numOfComments, setNumOfComments] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [postUpdate, setPostUpdate] = useState(0);
  const [content, setContent] = useState();

  let navigate = useNavigate();

  const postRef = ref(db, "posts/" + post.post_id);

  const user_profile = useGetUserProfilePicture(user.id);

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
    // post.contents?.forEach((content)=>{
    //   console.log(content.file_path);

    // })

    //CONTENT
    if (post.contents) {
      const content = Object.keys(post.contents);
      // console.log(`CONTENTS of: ${post.post_id} = ${list}`);

      //console.log(`CONTENTS of: ${post.post_id} = ${content}`);
      // list.forEach((row)=>{
      //   console.log(`ROW of: ${row.key}`);
      // })
      getDownloadURL(
        storageRef(storage, `posts/${post.post_id}/${content}.jpeg`)
      )
        .then((url) => {
          setContent(url);
          //   const img = document.getElementById("postContent");
          //  img.setAttribute("src", url);
        })
        .catch((error) => {
          console.log("IMAGEG ERROR : " + error);
        });
    }

    //INDIVIDUAL POST DATA REACTS
    get(child(dbRef, `posts/${post.post_id}/reacted_users`))
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

    //INDIVIDUAL POST DATA SHARES
    get(child(dbRef, `posts/${post.post_id}/shared_by`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let shares = 0;
          let shared_by = [];
          snapshot.forEach((data) => {
            shared_by.push(data.key);
            shares += 1;
          });

          setNumOfShares(shares);
        } else {
          setNumOfShares(0);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postUpdate]);

  //Comments
  useEffect(() => {
    function fetchData() {
      onValue(
        child(dbRef, `posts/${post.post_id}/comments`),
        async (snapshot) => {
          const data = snapshot.val();
          if (snapshot.exists()) {
            let comments = [];
            let numOfComments = 0;

            await snapshot.forEach((data) => {
              // Get number of replies inside comments //
              get(
                child(
                  dbRef,
                  `posts/${post.post_id}/comments/${data.key}/replies/`
                )
              ).then((snapshot) => {
                if (snapshot.exists()) {
                  snapshot.forEach((data) => {
                    numOfComments += 1;
                  });
                } else {
                  return;
                }
              });

              const commentDetails = {
                post_id: post.post_id,
                comment_id: data.key,
                comment: data.val().comment,
                date_posted: data.val().date_posted,
                user_id: data.val().user_id,
              };

              comments.push(commentDetails);
              comments.reverse();
              numOfComments += 1;
            });
            await setComments(comments);
            await setNumOfComments(numOfComments);
          } else {
            setNumOfComments(0);
          }
        }
      );
    }

    fetchData();
  }, []);

  const deletePost = () => {
    remove(ref(db, "posts/" + post.post_id)).then(() => {
      if (post.content) {
        deleteObject(
          storageRef(
            storage,
            `posts/${post.post_id}/${Object.keys(post.contents)}.jpeg`
          )
        )
          .then(() => {
            handleRefresh();
          })
          .catch((error) => {
            console.log("failed to delete: " + error);
          });
      } else {
        handleRefresh();
      }
    });
  };

  const handleReactPost = () => {
    if (reacted) {
      remove(ref(db, "posts/" + post.post_id + "/reacted_users/" + user.id));
    } else {
      update(ref(db, "posts/" + post.post_id + "/reacted_users/" + user.id), {
        date_reacted: Date.now(),
      });
    }
    setPostUpdate(postUpdate + 1);
  };

  const [openPostModal, setOpenPostModal] = useState();

  const modalStyle = {
    content: {
      top: "auto",
      left: "50%",
      right: "180px",
      bottom: "auto",
      ariaHideApp: false,
      transform: "translate(-50%, 0)",
      height: "fit",
      width: "500px",
      marginBottom: "20px",
      marginTop: "20px",
      overflow: "hidden",
      borderRadius: "10px",
    },
  };

  const handleOpenModal = () => {
    document.body.style.overflow = "hidden";
    setOpenPostModal(true);
  };

  const handleCloseModal = () => {
    setOpenPostModal(false);
  };

  const handleCommentPost = () => {
    if (!showCommentBox) {
      setShowCommentBox(!showCommentBox);
    }
  };

  const handleSharePost = () => {
    handleOpenModal();
  };

  const handleCommentListener = (e) => {
    setMyComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();

    const commentData = {
      user_id: user.id,
      comment: myComment,
      date_posted: Date.now(),
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

  const SharedPost = () => {
    let data = {};
    let fetchData;
    let fetchInfo;
    
    const [finish, setFinish] = useState(false);

    const Get = () => {
      fetchData = useGetPostData(post.shared_post);
      fetchInfo = useGetUserInfo(post.user_id);
      if (fetchData) {
      
        data.post_id = fetchData.post_id;
        data.user_id = fetchData.user_id;
        data.caption = fetchData.caption;
        data.shared_post = fetchData.shared_post;
        data.date_posted = fetchData.date_posted;
        data.feeling = fetchData.feeling;

        data.content = getDownloadURL(
          storageRef(
            storage,
            `posts/${post.shared_post_id}/${Object.keys(
              fetchData?.contents
            )}.jpeg`
          )
        )
          .then((url) => {
            console.log("url: " + url);
          })
          .catch((error) => {});
      }

      if (fetchInfo) {
        data.firstname = fetchInfo.firstname;
        data.lastname = fetchInfo.lastname;
        console.log("fetchInfo:"+JSON.stringify(fetchInfo));
      }

      if (fetchData && fetchInfo) {
        setFinish(true);
      }

      console.log("data:"+JSON.stringify(data));
    };

    // Get();

    console.log("render: "+post.post_id);

    return <div>{finish ? <SharedPostContent sharedPost={data} /> : ""}</div>;
  };

  return (
    <Post
      box_value={() => {
        if (notView) {
          return `0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)`;
        }
      }}
    >
      {openPostModal ? (
        <Modal
          isOpen={() => handleOpenModal()}
          // onAfterOpen={afterOpenModal}
          onAfterClose={() => (document.body.style.overflow = "auto")}
          onRequestClose={() => handleCloseModal()}
          style={modalStyle}
          ariaHideApp={false}
          // ariaHideApp={true}
          contentLabel=""
        >
          <CreatePost
            data={{
              width: "auto",
              minWidth: "auto",
            }}
            setOpenPostModal={setOpenPostModal}
            sharedPost={{
              shared: true,
              data: {
                firstname: firstname,
                lastname: lastname,
                content: content ? content : null,
                feeling: post.feeling,
                date_posted: post.date_posted,
                caption: post.caption,
                shared_post_user_id: post.user_id,
                shared_post_id: post.post_id,
              },
            }}
          />
        </Modal>
      ) : (
        ""
      )}

      {post.shared_post ? (
        <div className="text-left ">
          <p className="mt-4 ml-4 mb-3 font-normal text-sm">{`${firstname} ${lastname} shared a post`}</p>
          <Divider />
        </div>
      ) : (
        ""
      )}

      <RowBottom className="pt-4">
        <Row>
          <div>
            <ReactRoundedImage
              image={useGetUserProfilePicture(post.user_id)}
              roundedSize="0"
              imageWidth="40"
              imageHeight="40"
            ></ReactRoundedImage>
          </div>
          <div>
            {post.feeling ? (
              <div className="flex flex-row text-center">
                <Name
                  className="clickable-text justify-self-center"
                  onClick={() => {
                    navigate("/Main/Profile/" + post.user_id);
                  }}
                >
                  {firstname + " " + lastname}
                </Name>
                <p className="ml-1 justify-self-center self-center text-[14px]">{`is ${post.feeling}`}</p>
              </div>
            ) : (
              <Name
                className="clickable-text"
                onClick={() => {
                  navigate("/Main/Profile/" + post.user_id);
                }}
              >
                {firstname + " " + lastname}
              </Name>
            )}

            <div className="flex flex-row text-gray-600">
              <TimeLabel>
                <DateFormat date={post.date_posted} addSuffix={true} /> ???
              </TimeLabel>
              <FaGlobeAsia className="self-center ml-1" />
            </div>
          </div>
        </Row>

        {post.user_id === userContextId ? (
          notView ? (
            <div
              className="text-neutral-500 hover:bg-neutral-300 h-fit p-2 rounded-full"
              onClick={() => deletePost()}
            >
              <FiTrash2 className="h-5 w-5 " />
            </div>
          ) : null
        ) : null}
      </RowBottom>
      <Caption className="text-gray-600 mb-3 text-[16px]">
        {post.caption}
      </Caption>

      {post.shared_post ? <SharedPost /> : ""}

      {notView ? (
        post.contents ? (
          <PostImage
            alt="post"
            src={content}
            onClick={() => {
              setViewData({
                data: {
                  post: post,
                  content: content,
                },
              });
              setShowView(true);
              //  navigate("/Main/View/");
            }}
          ></PostImage>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      <div>
        <RowBottom className="mt-2">
          {numOfReacts ? (
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
          ) : (
            ""
          )}
          <div className="flex flex-row">
            {numOfComments ? (
              <div className="self-center mr-3 text-neutral-500 font-semibold">
                <p>
                  {numOfComments
                    ? numOfComments == 1
                      ? numOfComments + " Comment"
                      : numOfComments + " Comments"
                    : ""}
                </p>
              </div>
            ) : (
              ""
            )}

            {numOfShare ? (
              <div className="self-center mr-3 text-neutral-500 font-semibold">
                <p>
                  {numOfShare
                    ? numOfShare == 1
                      ? numOfShare + " Share"
                      : numOfShare + " Shares"
                    : ""}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </RowBottom>
        <Divider />
      </div>

      {/* {numOfReacts ? (
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
         
              <p>
                {numOfComments
                  ? numOfComments == 1
                    ? numOfComments + " Comment"
                    : numOfComments + " Comments"
                  : ""}
              </p>
            </div>
          </RowBottom>

          <Divider className="mt-[-6px]"></Divider>
        </div>
      ) : (
        ""
      )} */}

      <div className="flex flex-row justify-around  ml-5 mr-5 mt-1 mb-1 text-neutral-500 ">
        {reacted ? (
          <div
            className="flex flex-row text-[#1877f2] justify-center w-[100%] hover:bg-[#E4E6E9] rounded-xl p-2"
            onClick={handleReactPost}
          >
            <AiFillLike className="h-6 w-6 self-center" />
            <label className="ml-1 self-center text-[14px] font-semibold  text-[#1877f2]">
              Liked
            </label>
          </div>
        ) : (
          <div
            className="flex flex-row w-[100%] justify-center hover:bg-[#E4E6E9]  rounded-xl p-2"
            onClick={handleReactPost}
          >
            <AiOutlineLike className="h-6 w-6 self-center" />
            <label className="ml-1 self-center text-[14px] font-semibold">
              Like
            </label>
          </div>
        )}

        <div
          className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9]  rounded-xl p-2"
          onClick={handleCommentPost}
        >
          <AiOutlineMessage className="h-6 w-6 self-center" />
          <label className="ml-1 self-center text-[14px] font-semibold">
            Comment
          </label>
        </div>

        <div
          className="flex flex-row justify-center w-[100%] hover:bg-[#E4E6E9]  rounded-2xl p-2 "
          onClick={handleSharePost}
        >
          <AiOutlineRetweet className="h-6 w-6 self-center" />
          <label className="ml-1 self-center text-[14px] font-semibold">
            Share
          </label>
        </div>
      </div>

      {showCommentBox || !notView ? (
        <div className={!notView ? "overflow-y-scroll h-[65vh]" : null}>
          <div>
            <Divider className="mt-1"></Divider>
            <div className="p-4 flex flex-row">
              <div className="self-center">
                <ReactRoundedImage
                  image={user_profile}
                  roundedSize="0"
                  imageWidth="40"
                  imageHeight="40"
                ></ReactRoundedImage>
              </div>

              {myComment ? (
                <div className="ml-3 pl-1 w-[100%] pr-3 flex flex-row rounded-3xl bg-[#F0F2F5] border-transparent">
                  <input
                    className=" w-[100%] rounded-3xl bg-[#F0F2F5] border-transparent placeholder-neutral-500 "
                    onChange={(e) => {
                      handleCommentListener(e);
                    }}
                    value={myComment}
                  ></input>
                  <div
                    className="flex flex-row p-2 self-center mr-[-5px]  text-neutral-600 rounded-full hover:bg-[#E4E6E9]"
                    onClick={submitComment}
                  >
                    <p className="self-center mr-1 font-bold">Send</p>
                    <AiOutlineSend className="h-6 w-6"></AiOutlineSend>
                  </div>
                </div>
              ) : (
                <div className="w-[100%] pr-3">
                  <input
                    className="pl-3 ml-3 w-[100%] rounded-3xl bg-[#F0F2F5] border-transparent placeholder-neutral-500 hover:bg-[#E4E6E9]"
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
          {comments &&
            comments.map((commentData) => (
              <Comments
                key={commentData.comment_id}
                commentData={commentData}
              ></Comments>
            ))}
        </div>
      ) : (
        ""
      )}
    </Post>
  );
};

export default Posts;
