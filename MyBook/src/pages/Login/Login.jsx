import "./Login.css";

import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logedinUser, loginUser } from "../../redux/Login/action";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [log, setLog] = useState(false);
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  // console.log(currentUser, "currentUser");
  // console.log(loading, "loading");
  const handlesubmin = (e) => {
    e.preventDefault();
    console.log(email.current.value, password.current.value);
    dispatch(
      loginUser({
        email: email.current.value,
        password: password.current.value,
      })
    );
    setLog(true);
    navigate("/");
  };
  useEffect(() => {
    dispatch(logedinUser());
  }, [currentUser?.user]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MyBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MyBook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handlesubmin}>
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              ref={password}
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton">
              {/* {loading ? <CircularProgress size="30px" /> : "Log In"} */}
              Login
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to={"/register"}>
              <button className="loginRegisterButton">
                {loading ? <CircularProgress /> : "Create a New Account"}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Checkbox,
//   Stack,
//   Link,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
//   FormHelperText,
//   FormErrorMessage,
// } from "@chakra-ui/react";

// import React, { useEffect, useRef, useState } from "react";
// import { CircularProgress } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
// import { logedinUser, loginUser } from "../../redux/Login/action";
// import { useNavigate } from "react-router-dom";

// export const Login = () => {
//   const [log, setLog] = useState(false);
//   const email = useRef();
//   const password = useRef();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentUser, loading } = useSelector((state) => state.user);
//   // console.log(currentUser, "currentUser");
//   console.log(loading, "loading");
//   const handlesubmin = (e) => {
//     e.preventDefault();
//     console.log(email.current.value, password.current.value);
//     dispatch(
//       loginUser({
//         email: email.current.value,
//         password: password.current.value,
//       })
//     );
//     setLog(true);
//     navigate("/");
//   };
//   useEffect(() => {
//     dispatch(logedinUser());
//   }, [currentUser?.user]);
//   const isError = email.current?.value === "";

//   return (
//     <Flex
//       minH={"100vh"}
//       align={"center"}
//       justify={"center"}
//       bg={useColorModeValue("gray.50", "gray.800")}
//     >
//       <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//         <Stack align={"center"}>
//           <Heading fontSize={"4xl"}>Sign in to your account</Heading>
//           <Text fontSize={"lg"} color={"gray.600"}>
//             to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
//           </Text>
//         </Stack>
//         <Box
//           rounded={"lg"}
//           bg={useColorModeValue("white", "gray.700")}
//           boxShadow={"lg"}
//           p={8}
//         >
//           <Stack spacing={4}>
//             <FormControl id="email">
//               <FormLabel>Email address</FormLabel>
//               <Input type="email" ref={email} required placeholder="Email" />
//               {!isError ? (
//                 <FormHelperText>
//                   Enter the email you'd like to receive the newsletter on.
//                 </FormHelperText>
//               ) : (
//                 <FormErrorMessage>Email is required.</FormErrorMessage>
//               )}
//             </FormControl>
//             <FormControl id="password">
//               <FormLabel>Password</FormLabel>
//               <Input
//                 type="password"
//                 ref={password}
//                 required
//                 placeholder="Password"
//               />
//             </FormControl>
//             <Stack spacing={10}>
//               <Stack
//                 direction={{ base: "column", sm: "row" }}
//                 align={"start"}
//                 justify={"space-between"}
//               >
//                 <Checkbox>Remember me</Checkbox>
//                 <Link color={"blue.400"}>Forgot password?</Link>
//               </Stack>
//               <Button
//                 bg={"blue.400"}
//                 color={"white"}
//                 _hover={{
//                   bg: "blue.500",
//                 }}
//                 onClick={handlesubmin}
//               >
//                 Sign in
//               </Button>
//             </Stack>
//           </Stack>
//         </Box>
//       </Stack>
//     </Flex>
//   );
// };
