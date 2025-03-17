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

  let disabled = connectionStatus !== "connected";

  const onPress = useCallback(() => {
    if (disabled) return;
    setButton(button, true);
  }, [button, setButton, disabled]);

  const onRelease = useCallback(() => {
    setButton(button, false);
  }, [button, setButton, disabled]);

  return (
    <IconButton
      {...props}
      tabIndex={-1}
      disabled={disabled}
      variant={buttonVariant(pressed)}
      onPointerDown={onPress}
      onPointerUp={onRelease}
    >
      {children}
    </IconButton>
  );
});

export default VRChatButton;
