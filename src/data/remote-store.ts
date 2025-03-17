import { ConnectionStatus } from "@/types/remote";
import { VRChatAxesInput, VRChatButtonInput, VRChatState } from "@/types/vrc";
import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createConnect } from "./connect";
import { createDisconnect } from "./disconnect";
import { VRCRemoteClient } from "./remote-client";
import { createSendMessage } from "./send-message";
import { createSetAxis } from "./set-axis";
import { createSetButton } from "./set-button";
import { createSetTyping } from "./set-typing";

export type VRChatRemoteState = {
  vrc: VRChatState;
  setButton: (button: VRChatButtonInput, pressed: boolean) => void;
  setAxis: (axis: VRChatAxesInput, value: number) => void;
  setTyping: (typing: boolean) => void;
  sendMessage: (message: string) => void;
  connect: (address: string) => void;
  disconnect: () => void;
  connection: {
    status: ConnectionStatus;
    _client: VRCRemoteClient;
  };
};

export const useRemoteStore = create<VRChatRemoteState>()(
  immer((...params) => {
    let [set] = params;

    let client = new VRCRemoteClient();
    client.addConnectionStatusListener((newStatus) =>
      set((prev) => {
        prev.connection.status = newStatus;
      })
    );

    return {
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
      sendMessage: createSendMessage(...params),
      connect: createConnect(...params),
      disconnect: createDisconnect(...params),
      connection: {
        status: "disconnected",
        _client: client,
      },
    };
  })
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
