import { Grid, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import {
  FaAngleDoubleUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaRunning,
} from "react-icons/fa";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import VRChatButton from "./VRChatButtonInput";

type MovementControlProps = {};

const MovementControl: React.FC<MovementControlProps> = ({}) => {
  return (
    <Stack>
      <Grid templateColumns={"repeat(3,1fr)"} gap="2">
        <VRChatButton button="lookLeft">
          <FaArrowRotateLeft />
        </VRChatButton>
        <VRChatButton button="moveForward">
          <FaArrowUp />
        </VRChatButton>
        <VRChatButton button="lookRight">
          <FaArrowRotateRight />
        </VRChatButton>
        <VRChatButton button="moveLeft">
          <FaArrowLeft />
        </VRChatButton>
        <VRChatButton button="moveBackward">
          <FaArrowDown />
        </VRChatButton>
        <VRChatButton button="moveRight">
          <FaArrowRight />
        </VRChatButton>
      </Grid>
      <HStack>
        <VRChatButton flex={1} button="run">
          <FaRunning />
        </VRChatButton>
        <VRChatButton flex={1} button="jump">
          <FaAngleDoubleUp />
        </VRChatButton>
      </HStack>
    </Stack>
  );
};

export default MovementControl;
