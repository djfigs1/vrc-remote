import { createVRChatRemoteDispatcher } from "./remote-store";

export const createConnect = createVRChatRemoteDispatcher(
  (_, get) => (address: string) => {
    get().connection._client.connect(address);
  }
);
