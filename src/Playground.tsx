import { Box, Button, Container } from "@mui/material";
import React, { ChangeEvent, FC, memo, useState } from "react";
import OCButton from "./common/OCButton";
import OCTextfield from "./common/OCTextfield";
import AuthCard from "./components/Auth/AuthCard";

const Playground = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" gap={2} paddingTop={4}>
          <OCButton label="Login" variant="primary" />
          <OCButton label="Register" variant="outline" />
          <OCTextfield label={"Label"} />
        </Box>
      </Container>
    </div>
  );
};

export default memo(Playground);
