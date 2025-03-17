import { createVRChatRemoteDispatcher } from "./remote-store";

export const createSendMessage = createVRChatRemoteDispatcher(
  (_, get) => (message: string) => {
    get().connection._client.send("/chatbox/input", message, true);
  }
);
