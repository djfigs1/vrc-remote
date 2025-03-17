"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { VRCRemoteTheme } from "./theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={VRCRemoteTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
