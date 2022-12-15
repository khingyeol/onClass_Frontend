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

const useStyles = makeStyles((theme: Theme) => ({
  dialogJoin: {
    // borderRadius: "50px",
    width: "100%",
    height: "50%",
  }
}));


const NavAddBtn: FC = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [menuAddBtn, setMenuAddBtn] = useState<Element | null>(null);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleJoinDialog = () => {
    setOpenJoinDialog(!openJoinDialog);
  };

  const handleCreateDialog = () => {
    setOpenCreateDialog(!openCreateDialog);
  };

  const handleAddBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMenuAddBtn(event.currentTarget);
  };

  return (
    <>
    <Dialog
    open={openJoinDialog}
    onClose={handleJoinDialog}
    PaperProps={{
      className: classes.dialogJoin,
      style: {
        borderRadius: "35px"
      }
    }}
    >
      <Box padding="20px">
      <Box display="flex">

      </Box>
      </Box>
      
    </Dialog>
      <Button
        variant="outlined"
        onClick={(e) => handleAddBtn(e)}
        sx={{
          width: { xs: "40px", sm: "auto" },
          height: { xs: "40px", sm: "auto" },
          padding: { xs: "22px 0px 22px 0px", sm: "12px 18px" }, //Vertical, Horizontal
          borderRadius: "15px",
          gap: { xs: 0, sm: 1 },
          borderWidth: 1,
          borderColor: onClassColorTheme.darkGrey,
          "&:hover": {
            borderColor: onClassColorTheme.darkGrey,
            backgroundColor: alpha(onClassColorTheme.darkGrey, 0.1),
          },
          "&& .MuiTouchRipple-child": {
            backgroundColor: onClassColorTheme.darkGrey,
          },
        }}
      >
        <img
          src={AddButton}
          style={{ height: 17, width: 17, margin: 0 }}
          alt="add-btn"
        />
        {isDesktop ? (
          <Typography
            fontSize={20}
            paddingLeft={1}
            style={{ textTransform: "none" }}
          >
            ชั้นเรียน
          </Typography>
        ) : null}
      </Button>
      <Menu
        anchorEl={menuAddBtn}
        open={Boolean(menuAddBtn)}
        onClose={() => setMenuAddBtn(null)}
      >
        <MenuItem key="join-class" onClick={handleJoinDialog}>
          Join Class
        </MenuItem>
        <MenuItem key="create-class" onClick={handleCreateDialog}>
          Create Class
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavAddBtn;
