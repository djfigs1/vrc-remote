import { VRChatButtonInput } from "@/types/vrc";
import { createVRChatRemoteDispatcher } from "./remote-store";

export const createSetButton = createVRChatRemoteDispatcher(
  (set, get) => (button: VRChatButtonInput, on: boolean) => {
    set((prev) => {
      prev.vrc.buttons[button] = on;

      let oscInputName = button.charAt(0).toUpperCase() + button.slice(1);
      get().connection._client.send(`/input/${oscInputName}`, on);
    });
  }
);
