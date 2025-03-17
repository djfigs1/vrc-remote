import { VRChatAxesInput } from "@/types/vrc";
import { createVRChatRemoteDispatcher } from "./remote-store";

export const createSetAxis = createVRChatRemoteDispatcher(
  (set) => (axis: VRChatAxesInput, value: number) => {
    set((prev) => {
      prev.vrc.axes[axis] = value;
    });
  }
);
