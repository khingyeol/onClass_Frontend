import { Box, Button, Container, SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent, FC, memo, useState, useRef } from "react";
import OCButton from "./common/OCButton";
import OCIconButton from "./common/OCIconButton";
import OCTextfield from "./common/OCTextfield";
import AuthCard from "./components/Auth/AuthCard";
import Icon from "./assets/svg/icon_asm.svg";
import { OCPollBuilderFunction } from "./common/OCPollBuilder";
import OCPollBuilder from "./common/OCPollBuilder";
import { onClassColorTheme } from "./common/theme/onClassColorTheme";
import { ReactComponent as AddIcon } from "./assets/svg/icon_plus.svg";
import OCChip from "./common/OCChip";
import OCDropDown from "./common/OCDropDown";

const Playground = () => {
  // poll
  const [pollItems, setPollItems] = useState<string[]>(["", ""]);
  const pollBuilderRef = useRef<OCPollBuilderFunction>(null);
  const chipData = [
    { label: "A A", value: "AAA" },
    { label: "B B", value: "BBB" },
  ];
  const [selectedDropdown, setSelectedDropdown] = useState<string>("");

  const handlePollItemsChange = (value: string, index: number) => {
    const temp = [...pollItems];
    let item = temp[index];
    item = value;
    temp[index] = item;
    setPollItems([...temp]);
  };

  const handleUpdatePollItem = (type: string) => {
    let temp = [...pollItems];
    if (type === "add") {
      temp = [...temp, ""];
    } else if (type === "remove") {
      temp.splice(temp.length - 1, 1);
    }
    setPollItems([...temp]);
  };

  const handleOnPollCancel = () => {
    setPollItems(["", ""]);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" gap={2} paddingTop={4}>
          OCButton-primary
          <OCButton label="Login" variant="primary" />
          OCButton-outline
          <OCButton label="Register" variant="outline" />
          OCButton-corner
          <OCButton
            label="cancel"
            variant="error"
            fontWeight="regular"
            height="28px"
            cornerRadius="8px"
          />
          OCButton-corner
          <OCButton
            label="Create New Assignment"
            leadingIcon={<AddIcon />}
            fontSize="20px"
            height="61px"
            variant="black"
            fontWeight="regular"
          />
          OCTextfield
          <OCTextfield label={"Label"} placeholder={"placeholder"} />
          OCIconButton
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <OCIconButton icon={Icon} color={"#0000"} size={"50px"} />
            <OCIconButton
              icon={Icon}
              color={onClassColorTheme.grey}
              size={"39px"}
              type="square"
              onClick={() => {}}
            />
            <OCIconButton
              icon={Icon}
              color={onClassColorTheme.grey}
              size={"39px"}
              type="square"
              disabled
            />
          </div>
          <div>
            <OCButton
              label="show poll"
              variant="primary"
              fontWeight="regular"
              height="28px"
              cornerRadius="8px"
              onClick={() => pollBuilderRef?.current?.onClickShow()}
            />
            <OCPollBuilder
              pollItems={pollItems}
              handleChange={handlePollItemsChange}
              handleUpdatePollItem={handleUpdatePollItem}
              handleOnCancel={handleOnPollCancel}
              ref={pollBuilderRef}
            />
          </div>
          <div>
            OCChip
            <OCChip data={chipData} />
          </div>
          <OCDropDown
            label="ปรับบทบาท"
            items={["TEST1", "TEST2"]}
            placeholder="กรุณาเลือกชื่อ"
            handleChange={(e) => {
              setSelectedDropdown(e.target.value as string);
            }}
            value={selectedDropdown}
          />
        </Box>
      </Container>
    </div>
  );
};

export default memo(Playground);
