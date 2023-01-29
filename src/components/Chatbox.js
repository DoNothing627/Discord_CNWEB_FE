import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";
//building chatbox
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      // d='flex'
      alignItems="center"
      flexDir="column"
      // justifyContent='space-between'
      p={3}
      bg=" #2C2F33 "
      color = '#404EED '
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      // borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
