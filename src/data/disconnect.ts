import { createVRChatRemoteDispatcher } from "./remote-store";

export const createDisconnect = createVRChatRemoteDispatcher((_, get) => () => {
  get().connection._client.disconnect();
});
