import { useRemoteStore } from "@/data/remote-store";
import { VRChatButtonInput } from "@/types/vrc";
import React, { memo, useCallback, useEffect } from "react";
import { useShallow } from "zustand/shallow";

type VRChatKeyPressListenersProps = {
  keysConfig: VRChatKeyPressConfig;
};

export type VRChatKeyPressConfig = Record<string, KeyConfig>;

export type KeyConfig = {
  button: VRChatButtonInput;
  toggle?: boolean;
};

const VRChatKeyPressListeners: React.FC<VRChatKeyPressListenersProps> = memo(
  ({ keysConfig: keys }) => {
    const { setButton, isTyping, connectionStatus } = useRemoteStore(
      useShallow(
        ({
          setButton,
          vrc: {
            chatbox: { typing },
          },
          connection: { status },
        }) => ({ setButton, isTyping: typing, connectionStatus: status })
      )
    );

    const setKey = useCallback(
      (key: string, pressed: boolean) => {
        key = key.toLowerCase();
        let config = keys[key];
        if (!config || isTyping || connectionStatus !== "connected") return;

        setButton(config.button, pressed);
      },
      [keys, isTyping, connectionStatus, setButton]
    );

    const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
        setKey(e.key, true);
      },
      [setKey]
    );

    const onKeyUp = useCallback(
      (e: KeyboardEvent) => {
        setKey(e.key, false);
      },
      [setKey]
    );

    const onWindowBlur = useCallback(() => {}, [keys, setKey]);

    useEffect(() => {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      window.addEventListener("blur", onWindowBlur);
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("blur", onWindowBlur);
      };
    }, [onKeyDown, onKeyUp]);

    return <></>;
  }
);

export default VRChatKeyPressListeners;
