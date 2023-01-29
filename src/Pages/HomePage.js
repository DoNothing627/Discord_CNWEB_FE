import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();
  const [signUp, setSignUp] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="#2C2F33"
        w="100%"
        m="40px 0 15px 0"
        sx={{ border: "none", color: "#5865F2" }}
        borderRadius="lg"
        // borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Discord
        </Text>
      </Box>
      <Box
        sx={{ border: "none", color: "#5865F2" }}
        bg="#2C2F33"
        w="100%"
        p={4}
        borderRadius="lg"
      >
        {/* <Tabs isFitted variant="soft-rounded"> */}
        {/* <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList> */}
        {/* <TabPanels>
              <TabPanel> */}
        {!signUp ? (
          <Login
            state={() => {
              setSignUp(true);
            }}
          />
        ) : (
          <Signup
            state={() => {
              setSignUp(false);
            }}
          />
        )}
        {/* </TabPanel> */}
        {/* <TabPanel> */}

        {/* </TabPanel> */}
        {/* </TabPanels> */}
        {/* </Tabs> */}
      </Box>
    </Container>
  );
}

export default Homepage;
