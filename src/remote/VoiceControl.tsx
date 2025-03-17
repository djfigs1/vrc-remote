import React from "react";
import VRChatButton from "./VRChatButtonInput";
import { MdMic } from "react-icons/md";

type VoiceControlProps = {};

const VoiceControl: React.FC<VoiceControlProps> = ({}) => {
  return (
    <VRChatButton button="voice">
      <MdMic />
    </VRChatButton>
  );
};

export default VoiceControl;
