export type VRChatAxesInput = keyof VRChatAxesInputState;

export type VRChatAxesInputState = {
  vertical: number;
  horizontal: number;
  lookHorizontal: number;
  useAxisRight: number;
  grabAxisRight: number;
  moveHoldFB: number;
  spinHoldCwCcw: number;
  spinHoldUD: number;
  spinHoldLR: number;
};

export type VRChatButtonInput = keyof VRChatButtonInputState;

export type VRChatButtonInputState = {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  lookLeft: boolean;
  lookRight: boolean;
  jump: boolean;
  run: boolean;
  comfortLeft: boolean;
  comfortRight: boolean;
  dropRight: boolean;
  useRight: boolean;
  dropLeft: boolean;
  useLeft: boolean;
  grabLeft: boolean;
  panicButton: boolean;
  quickMenuToggleLeft: boolean;
  quickMenuToggleRight: boolean;
  voice: boolean;
};

export type VRChatChatboxState = {
  typing: boolean;
};
