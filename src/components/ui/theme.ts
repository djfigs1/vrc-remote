import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const ThemeConfig = defineConfig({
    globalCss: {
        html: {
            colorPalette: "teal"
        }
    }
})

export const VRCRemoteTheme = createSystem(defaultConfig, ThemeConfig);