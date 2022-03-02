import React from "react";

import styled from "styled-components";

const Column = styled.div`
  background-color: #f0f2f5;
  height: 80vh;
  width: 80vw;
  display: block;
  flex-direction: column;
  padding-top: 100px;
  padding-left: 100px;
  padding-right: 100px;
`;

const Row = styled.div`
  display: flex;

  flex-direction: row;
  height: auto;
  width: 100%;
  justify-content: space-around;
`;

const Divider = styled.hr`
  margin-top: 20px;
  border-top: 1px solid #bbb;
  margin-left: 5px;
  margin-right: 5px;
`;

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;
  margin: auto;
  margin-left: 50px;
  margin-right: 50px;

  height: auto;
  width: 22vw;
  min-height: auto;
  min-width: 22vw;
  margin-top: 20px;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
`;

const Text = styled.h1`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const EmailInput = styled.input`
  font-size: medium;
  padding: 10px;
  border-radius: 10px;
`;

const PasswordInput = styled.input`
  margin-top: 10px;
  font-size: medium;
  padding: 10px;
  border-radius: 10px;
`;

const LoginButton = styled.button`
  margin-top: 10px;
  font-size: medium;
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: royalblue;
`;

const CreateButton = styled.button`
  font-size: medium;
  padding: 10px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
font-size: 50px;

`;

const Page = (props) => {
  return (
    <Column>
      <Row>
        <div
          style={{
            textAlign: "left",
            margin: "auto",

            justifyContent: "center",
          }}
        >
          <Title>Fishbook</Title>
          <span>Connect with fish and the world around you on Fishbook.</span>
        </div>
        <div
          style={{
            textAlign: "left",
            margin: "auto",
          }}
        >
          <LoginCard>
            <Form>
              <EmailInput></EmailInput>
              <PasswordInput></PasswordInput>
              <LoginButton>Login</LoginButton>
            </Form>

            <Divider />
            <p>Dont have an account?</p>

            <CreateButton>Create account</CreateButton>
          </LoginCard>
        </div>
      </Row>

   

      <Banner>
        <Text03>
          <Text04>Swim, Swim, Swim</Text04>
        </Text03>
        <Text>Learn to swim</Text>
        <Text06>
          <span>
            A fish is an amazing animal which lives and breathes in water. Fish
            have been on the Earth for over 500 million years. All fish have a
            backbone and most breathe through gills and have fins and scales.
            Fish have excellent senses of sight, touch, taste and many possess a
            good sense of smell and 'hearing'.
          </span>
        </Text06>
      </Banner>
    </Column>

    // <Container>
    //   <Container1>
    //     <Container2>
    //       <Container3>
    //         <Container5>
    //           <Text05>Fishbook</Text05>
    //           <span>
    //             Connect with fish and the world around you on Fishbook.
    //           </span>
    //         </Container5>
    //         <Container4>
    //           <FeatureCard>
    //             <Form>
    //               <Textinput type="text" placeholder="Email or phone number" />
    //               <Textinput1 type="text" placeholder="Password" />
    //               <LoginButton>Login</LoginButton>
    //               <Container7>
    //                 <Text02>Forgot password?</Text02>
    //                 <RegisterButton>Create account</RegisterButton>
    //               </Container7>
    //             </Form>
    //           </FeatureCard>
    //         </Container4>
    //       </Container3>
    //       <Banner>
    //         <Text03>
    //           <Text04>Swim, Swim, Swim</Text04>
    //         </Text03>
    //         <Text05>Learn to swim</Text05>
    //         <Text06>
    //           <span>
    //             A fish is an amazing animal which lives and breathes in water.
    //             Fish have been on the Earth for over 500 million years. All fish
    //             have a backbone and most breathe through gills and have fins and
    //             scales. Fish have excellent senses of sight, touch, taste and
    //             many possess a good sense of smell and 'hearing'.
    //           </span>
    //         </Text06>
    //       </Banner>
    //     </Container2>
    //   </Container1>
    // </Container>
  );
};

export default Page;

const Container = styled("div")({
  width: "auto",
  height: "auto",
  "min-height": "100vh",
  "overflow-x": "hidden",
  "padding-top": "200px",

  display: "flex",
  "flex-direction": "column",
  "align-items": "flex-start",
  "justify-content": "center",
});

const Container1 = styled("div")({
  display: "flex",
  "flex-direction": "column",
  width: "100%",
  height: "auto",
  "align-items": "flex-start",
  flex: "2",
  "justify-content": "center",
  position: "relative",
});

const Container2 = styled("div")({
  display: "flex",
  height: "auto",
  "flex-direction": "column",
  width: "100%",
  "align-items": "center",
  flex: "3",
  "justify-content": "center",
  position: "relative",
  "align-items": "center",
});

const Container3 = styled("div")({
  display: "flex",
  flex: "0 0 auto",
  "align-self": "flex-start",
  position: "absolute",
  margin: "80px",
  right: "0px",
  top: "0px",
  height: "144px",
  "flex-direction": "column",
  "justify-content": "center",
  "align-items": "center",
  left: "0px",
});

const Container4 = styled("div")({
  display: "flex",
  width: "100%",
  "align-items": "center",
  flex: "0 0 auto",
  position: "relative",
  "justify-content": "center",
  "margin-top": "40px",
  "margin-bottom": "40px",
});

const Container5 = styled("div")({
  display: "flex",
  "flex-direction": "column",
  "align-items": "flex-start",

  flex: "0 0 auto",
});



const Container6 = styled("div")({
  display: "flex",
  "flex-direction": "column",
  "align-items": "flex-start",
  flex: "0 0 auto",
  "align-self": "flex-end",
  top: "0px",
  position: "absolute",
  right: "0px",
  padding: "16px",
});

const FeatureCard = styled("div")({
  display: "flex",
  padding: "40px",

  "border-radius": "15px",
  "box-shadow": "5px 5px 10px 0px rgba(18, 18, 18, 0.1)",
  "align-items": "flex-start",
  transition: "0.3s",
  "flex-direction": "column",
  "justify-content": "flex-start",
  width: "auto",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const Email = styled("input")({
  "border-radius": "5px",
  width: "80%",
  "margin-top": "16px",
  "margin-left": "16px",
  "margin-right": "16px",
  padding: "12px",
});

const Password = styled("input")({
  "border-radius": "5px",
  width: "80%",
  "margin-top": "16px",
  padding: "12px",
});

const Container7 = styled("div")({
  display: "flex",
  "flex-direction": "column",
  width: "100%",
  "align-items": "flex-start",
  flex: "0 0 auto",
});

const Text02 = styled("span")({
  "align-self": "center",
  width: "100%",
  "text-align": "center",
  "margin-top": "16px",
});

const RegisterButton = styled("button")({
  "margin-top": "16px",
  "align-self": "center",
  "border-radius": "5px",
  padding: "12px",
});

const Banner = styled("div")({
  width: "100%",
  display: "flex",


  "align-items": "center",

  "margin-top": "150px",
  // "padding-left": "48px",
  // "padding-right": "48px",
  "flex-direction": "column",
  "padding-bottom": "64px",
  "justify-content": "center",
  left: "0px",
  //position: "absolute",
  bottom: "0px",
  "@media(max-width: 767px)": {
    "padding-left": "32px",
    "padding-right": "32px",
  },
  "@media(max-width: 479px)": {
    "padding-top": "48px",
    "padding-left": "16px",
    "padding-right": "16px",
    "padding-bottom": "48px",
  },
});

const Text03 = styled("span")({
  "font-size": "0.75rem",
  "text-align": "center",
  "font-weight": "600",
  "margin-bottom": "32px",
  "letter-spacing": "2px",
  "margin-top": "100px",
});

const Text04 = styled("span")({
  "text-transform": "uppercase",
});

const Text06 = styled("span")({
  "max-width": "1400px",
  "text-align": "center",
  "margin-bottom": "32px",
  "@media(max-width: 991px)": {
    width: "100%",
  },
  "@media(max-width: 767px)": {
    "padding-left": "16px",
    "padding-right": "16px",
  },
});

const Container8 = styled("div")({
  flex: "0 0 auto",
  width: "100%",
  height: "auto",
  display: "flex",
  "align-items": "flex-start",
  "flex-direction": "row",
  "justify-content": "center",
  "@media(max-width: 479px)": {
    "align-items": "center",
    "flex-direction": "column",
  },
});

const Textinput2 = styled("input")({
  "font-size": "0.75rem",
  "border-color": "#FFFFFF",
});

const Button2 = styled("button")({
  color: "#FFFFFF",
  "font-size": "0.75rem",
  "margin-left": "16px",
  transition: "0.3s",
  "background-color": "#000000",
  "@media(max-width: 479px)": {
    "margin-top": "16px",
    "margin-left": "0px",
  },
  "&:hover": {
    color: "#000000",
    "background-color": "transparent",
  },
});
