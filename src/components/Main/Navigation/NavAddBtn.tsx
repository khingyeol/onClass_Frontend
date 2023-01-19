import AddButton from "../../../assets/svg/icon_plus.svg";
import {
  Box,
  Button,
  Dialog,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useState } from "react";
import { onClassColorTheme } from "../../../common/theme/onClassColorTheme";
import { alpha, Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import JoinClassDialog from "./JoinClassDialog";
import CreateClassDialog from "./CreateClassDialog";
import OCButton from "../../../common/OCButton";
import { ReactComponent as AddButton2 } from "../../../assets/svg/icon_plus.svg";

const NavAddBtn: FC = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [menuAddBtn, setMenuAddBtn] = useState<Element | null>(null);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleAddBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMenuAddBtn(event.currentTarget);
  };

  return (
    <>
      <JoinClassDialog
        open={openJoinDialog}
        onClose={() => setOpenJoinDialog(!openJoinDialog)}
      />
      <CreateClassDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(!openCreateDialog)}
      />
      <OCButton
        label={isDesktop ? "ชั้นเรียน" : ""}
        onClick={(e) => handleAddBtn(e)}
        leadingIcon={<AddButton2 />}
        fontSize="20px"
        cornerRadius="15px"
        variant="black"
        fontWeight="regular"
        sx={{
          width: { xs: "40px", sm: "auto" },
          height: { xs: "40px", sm: "auto" },
          padding: { xs: "22px 0px 22px 0px", sm: "0px 18px" }, //Vertical, Horizontal
          gap: { xs: 0, sm: 1 },
          borderWidth: 1,
          borderColor: onClassColorTheme.darkGrey,
          "&& .MuiTouchRipple-child": {
            backgroundColor: onClassColorTheme.darkGrey,
          },
        }}
      />
      <Menu
        anchorEl={menuAddBtn}
        open={Boolean(menuAddBtn)}
        onClose={() => setMenuAddBtn(null)}
      >
        <MenuItem
          key="join-class"
          onClick={() => setOpenJoinDialog(!openJoinDialog)}
        >
          Join Class
        </MenuItem>
        <MenuItem
          key="create-class"
          onClick={() => setOpenCreateDialog(!openCreateDialog)}
        >
          Create Class
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavAddBtn;
