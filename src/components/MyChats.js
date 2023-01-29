import { AddIcon, Icon, StarIcon} from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  //use toast to notifice
  // console.log(JSON.parse(localStorage.getItem("userInfo")))
  const toast = useToast();
  //chat of mine
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="#2C2F33"
      color="#404EED"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      // borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        sx={{ display: "flex" }}
        justifyContent="space-between"
        alignItems="center"
        color="white"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            bg = '#404EED'
            color='black'
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg = '#2C2F33'
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        maxHeight={530}
      >
        {chats ? (
          <Stack overflowY="scroll" sx={{ maxHeight: "500px"}} bg = '#2C2F33'>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#404EED " : " #F6F6F6 "}
                color={selectedChat === chat ? "black" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text as='b' color='blue' fontSize='4x1'>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                <Text fontSize="xs">
                  <b>{chat.isGroupChat ? <Stack direction='row'>

                  <Avatar name='Sasuke Uchiha' src='https://bit.ly/broken-link' size='xs'/> 
                  <Avatar bg='teal.500'  size='xs' />
                  <Avatar src='https://bit.ly/broken-link' size='xs' />
                </Stack>: <Stack direction='row'>

                
                <Avatar bg='teal.500'  size='xs' />

                </Stack>}</b>
                </Text>
                {/* {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )} */}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
