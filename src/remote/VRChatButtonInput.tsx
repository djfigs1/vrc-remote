import { useRemoteStore } from "@/data/remote-store";
import { VRChatButtonInput } from "@/types/vrc";
import { buttonVariant } from "@/util/util";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React, { memo, useCallback } from "react";
import { useShallow } from "zustand/shallow";

type VRChatButtonProps = IconButtonProps & {
  button: VRChatButtonInput;
  children?: React.ReactNode;
};

const VRChatButton: React.FC<VRChatButtonProps> = memo((props) => {
  const { button, children } = props;
  const { pressed, setButton, connectionStatus } = useRemoteStore(
    useShallow(({ setButton, vrc: { buttons }, connection: { status } }) => ({
      pressed: buttons[button],
      connectionStatus: status,
      setButton,
    }))
  );

  const onPress = useCallback(() => {
    setButton(button, true);
  }, [button, setButton]);

  const onRelease = useCallback(() => {
    setButton(button, false);
  }, [button, setButton]);

  return (
    <IconButton
      {...props}
      disabled={connectionStatus !== "connected"}
      variant={buttonVariant(pressed)}
      onPointerDown={onPress}
      onPointerUp={onRelease}
    >
      {children}
    </IconButton>
  );
});

export default VRChatButton;
