import { createVRChatRemoteDispatcher } from "./remote-store";

export const createSetTyping = createVRChatRemoteDispatcher(
  (set, get) => (typing: boolean) => {
    set((prev) => {
      prev.vrc.chatbox.typing = typing;
      get().connection._client.send("/chatbox/typing", typing);
    });
  }
);
