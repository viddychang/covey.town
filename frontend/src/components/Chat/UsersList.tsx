import React,{useState} from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Table,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import useCoveyAppState from "../../hooks/useCoveyAppState";
import Chat from "./Chat";


const UsersList = () => {
  const {
    emitMovement, players,
  } = useCoveyAppState();
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [isPrivateShown, setPrivateShown] = useState(false);
  const handlePreview=()=>{
    onClose(); 
    setPrivateShown(true); 
  }
  const btnRef = React.useRef()
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Privately chat with a user
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>List of users in town</DrawerHeader>

            <DrawerBody>
              <Table variant="simple">
                <Tbody>
                  {players.map(player => (
                    <Tr key={player.id}>
                      <Td>{player.userName}</Td>
                      <Td><Button onClick = {handlePreview}>Chat</Button></Td>
                    </Tr>))}
                </Tbody>
              </Table>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>  
        </DrawerOverlay>
      </Drawer>
      {isPrivateShown && <Chat />}
    </>

  )
}
export default UsersList;
