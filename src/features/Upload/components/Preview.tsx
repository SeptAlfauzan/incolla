import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  imageURL: string;
  nameList: string[];
}

const Preview: React.FC<Props> = ({ imageURL, nameList }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <>
      <Accordion allowMultiple width={"full"}>
        <AccordionItem borderRadius={15}>
          <h2>
            <AccordionButton>
              <Text color={"blackAlpha.700"} flex="1" textAlign="left">
                Image template preview.
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            maxHeight={"180px"}
            pb={4}
            paddingX={8}
            color={"gray.500"}
            fontSize={14}
          >
            {imageURL === "" && (
              <Text>No image data, please upload the image file first!</Text>
            )}
            {imageURL && (
              <>
                <small>Click image to expand</small>
                <Image
                  onClick={() => setIsOpen(true)}
                  src={imageURL}
                  boxSize={"180px"}
                  objectFit={"contain"}
                />
              </>
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderRadius={15}>
          <h2>
            <AccordionButton>
              <Text color={"blackAlpha.700"} flex="1" textAlign="left">
                Names list preview.
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            maxHeight={"100px"}
            overflowY={"scroll"}
            wordBreak={"break-all"}
            paddingX={8}
            color={"gray.500"}
            fontSize={14}
          >
            {nameList.length === 0 && (
              <Text>No names list, please upload the csv file first!</Text>
            )}
            <ol>
              {nameList.map((name) => (
                <li>{name}</li>
              ))}
            </ol>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <ModalPreview imageUrl={imageURL} isOpen={isOpen} onClose={setIsOpen} />
    </>
  );
};
interface ModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPreview: React.FC<ModalProps> = ({ imageUrl, isOpen, onClose }) => {
  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={() => onClose(false)}
    >
      <ModalOverlay />
      <ModalContent margin={"10px"}>
        <ModalHeader>Image template preview.</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={imageUrl} boxSize={"400px"} objectFit={"contain"} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={() => onClose(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default Preview;
