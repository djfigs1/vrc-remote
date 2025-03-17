import {
  VRChatAxesInput,
  VRChatAxesInputState,
  VRChatButtonInput,
  VRChatButtonInputState,
  VRChatChatboxState,
} from "@/types/vrc";
import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSetAxis } from "./set-axis";
import { createSetButton } from "./set-button";
import { createSetTyping } from "./set-typing";
import { VRCRemoteClient } from "./remote-client";
import { ConnectionStatus } from "@/types/remote";

export type VRChatRemoteState = {
  vrc: {
    axes: VRChatAxesInputState;
    buttons: VRChatButtonInputState;
    chatbox: VRChatChatboxState;
  };
  setButton: (button: VRChatButtonInput, pressed: boolean) => void;
  setAxis: (axis: VRChatAxesInput, value: number) => void;
  setTyping: (typing: boolean) => void;
  sendMessage: (message: string) => void;
  connection: {
    status: ConnectionStatus;
    client: VRCRemoteClient;
  };
};

export const useRemoteStore = create<VRChatRemoteState>()(
  immer((...params) => ({
    vrc: {
      axes: {
        vertical: 0,
        horizontal: 0,
        lookHorizontal: 0,
        useAxisRight: 0,
        grabAxisRight: 0,
        moveHoldFB: 0,
        spinHoldCwCcw: 0,
        spinHoldUD: 0,
        spinHoldLR: 0,
      },
      buttons: {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        lookLeft: false,
        lookRight: false,
        jump: false,
        run: false,
        comfortLeft: false,
        comfortRight: false,
        dropRight: false,
        useRight: false,
        dropLeft: false,
        useLeft: false,
        grabLeft: false,
        panicButton: false,
        quickMenuToggleLeft: false,
        quickMenuToggleRight: false,
        voice: false,
      },
      chatbox: {
        typing: false,
      },
    },
    setButton: createSetButton(...params),
    setAxis: createSetAxis(...params),
    setTyping: createSetTyping(...params),
    sendMessage: () => {},
    connection: {
      status: "disconnected",
      client: new VRCRemoteClient(),
    },
  }))
);

export type VRChatRemoteStoreParameters = Parameters<
  StateCreator<VRChatRemoteState, [["zustand/immer", never]], []>
>;

export function createVRChatRemoteDispatcher<T>(
  factoryFunction: (...params: VRChatRemoteStoreParameters) => T
): (...params: VRChatRemoteStoreParameters) => T {
  return (...params: VRChatRemoteStoreParameters) => {
    return factoryFunction(...params);
  };
}
