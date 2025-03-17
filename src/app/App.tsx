import VRCRemote from "@/remote/VRCRemote";
import { Container, Flex } from "@chakra-ui/react";
import React from "react";

type AppProps = {};

const App: React.FC<AppProps> = ({}) => {
  return (
    <Container bgColor={"colorPalette.800"}>
      <Flex align={"center"} justify={"center"} minHeight={"100vh"}>
        <VRCRemote />
      </Flex>
    </Container>
  );
};

export default App;
