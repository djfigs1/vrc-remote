import { VRChatButtonInput } from "@/types/vrc";
import { createVRChatRemoteDispatcher } from "./remote-store";

export const createSetButton = createVRChatRemoteDispatcher(
  (set) => (button: VRChatButtonInput, on: boolean) => {
    set((prev) => {
      prev.vrc.buttons[button] = on;
    });
  }
);
