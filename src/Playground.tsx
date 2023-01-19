import { Box, Button, Container } from "@mui/material";
import React, { ChangeEvent, FC, memo, useState } from "react";
import OCButton from "./common/OCButton";
import OCIconButton from "./common/OCIconButton";
import OCTextfield from "./common/OCTextfield";
import AuthCard from "./components/Auth/AuthCard";
import Icon from "./assets/svg/icon_asm.svg";
import { onClassColorTheme } from "./common/theme/onClassColorTheme";
import { ReactComponent as AddIcon } from "./assets/svg/icon_plus.svg";

const Playground = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" gap={2} paddingTop={4}>
          OCButton-primary
          <OCButton label="Login" variant="primary" />
          OCButton-outline
          <OCButton label="Register" variant="outline" />
          OCButton-corner
          <OCButton label="cancel" variant="error" fontWeight="regular" height="28px" cornerRadius="8px" />
          OCButton-corner
          <OCButton label="Create New Assignment" leadingIcon={<AddIcon />} fontSize="20px" height="61px" variant="black" fontWeight="regular" />
          OCTextfield
          <OCTextfield label={"Label"} placeholder={"placeholder"} />
          OCIconButton
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <OCIconButton icon={Icon} color={"#0000"} size={"50px"} />
            <OCIconButton icon={Icon} color={onClassColorTheme.grey} size={"39px"} type="square" onClick={() => {}} />
            <OCIconButton icon={Icon} color={onClassColorTheme.grey} size={"39px"} type="square" disabled />
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default memo(Playground);
