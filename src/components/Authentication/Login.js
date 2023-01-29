import { Button } from "@chakra-ui/button";
import { IconButton } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
const Login = ({ state }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({ 
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      if (data !== undefined) {
        console.log(data, "data");
        localStorage.setItem("userInfo", JSON.stringify(data || ""));
      }
      setLoading(false);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // eslint-disable-next-line no-restricted-globals
      location.reload();
      // history.push("/chats");
    } catch (error) {
      // console.log(error)
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <VStack spacing="10px">
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={email}
            type="email"
            sx={{
              color: "#99AAB5",
              backgroundColor: "#23272A",
              borderColor: "#23272A",
              borderWidth: "2px",
            }}
            autoComplete='false'
            focusBorderColor="#5865F2"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={password}
              focusBorderColor="#5865F2"
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Enter password"
              sx={{
                color: "#99AAB5",
                backgroundColor: "#23272A",
                borderColor: "#23272A",
                borderWidth: "2px",
              }}
            />
            <InputRightElement width="3.0rem">
              <IconButton
                sx={{ backgroundColor: "#23272A", border: "none", height: 30 }}
                fontSize="20px"
                onClick={handleClick}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
          sx={{ backgroundColor: "#5865F2" }}
        >
          Login
        </Button>
        {/* <Button
        variant="solid"
        colorScheme="red"
        border="None"
        width="100%"
        // bg = {}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}>
        Get Guest User Credentials
      </Button> */}
        
      </VStack>
      <Text
        onClick={state}
        onMouseEnter={() => {
          setLinkHover(true);
        }}
        onMouseLeave={() => {
          setLinkHover(false);
        }}
        style={
          linkHover
            ? {
                cursor: "pointer",
                fontStyle: "italic",
                fontWeight: "bold",
                textDecoration: "underline",
              }
            : {}
        }
        // as='b'
      >
        Don't have an account?
      </Text>
    </>
  );
};

export default Login;
