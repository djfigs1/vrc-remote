import { createVRChatRemoteDispatcher } from "./remote-store";

export const createSetTyping = createVRChatRemoteDispatcher(
  (set) => (typing: boolean) => {
    set((prev) => {
      prev.vrc.chatbox.typing = typing;
    });
  }
);
