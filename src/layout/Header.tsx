import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useState } from "react";
import { ReactComponent as AppBarHamburger } from "../assets/svg/icon_hamburger.svg";
import AppLogo from "../assets/svg/app_logo.svg";
import { onClassColorTheme } from "../common/theme/onClassColorTheme";
import { appBarHeightSm, appBarHeightXs } from "./HomeLayout";
import { Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import dummyPic from "../assets/image/dummypic.png";
import NavAddBtn from "../components/Main/Navigation/NavAddBtn";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth/api_auth";

const Header: FC<{ handleDrawer: () => void }> = (props) => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const { handleDrawer } = props;
  const [menuUserProfile, setMenuUserProfile] = useState<Element | null>(null);
  const navigate = useNavigate();

  const handleUserProfile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMenuUserProfile(event.currentTarget);
  };

  const onTappedLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <AppBar
        position="fixed"
        // style={{ , }}
        sx={{
          // zIndex: 1301,
          height: { xs: appBarHeightXs, sm: appBarHeightSm },
          boxShadow: "none",
          backgroundColor: { xs: onClassColorTheme.white, sm: "transparent" },
          paddingTop: { xs: 0, sm: 4 },
          // background: { xs: "white", sm: "-webkit-linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))"}
        }}
      >
        <Toolbar>
          {/* AppBar Hamburger */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <Button startIcon={<AppBarHamburger />} onClick={handleDrawer} />
          </Box>

          {/* AppBar Logo */}
          <Box
            sx={{
              flexGrow: 1,
              color: "black",
              display: { xs: "flex", sm: "block" },
              paddingLeft: { sm: "20px" },
            }}
          >
            <img
              onClick={() => navigate("/")}
              src={AppLogo}
              style={{ height: isDesktop ? 31 : 20, cursor: "pointer" }}
              alt="app-logo"
            />
          </Box>

          {/* AppBar Add btn */}
          {isDesktop ? <NavAddBtn /> : null}
          <Box sx={{ m: 2 }} />

          {/* AppBar ProfilePic */}
          <IconButton onClick={(e) => handleUserProfile(e)}>
            <Avatar
              sx={{
                width: isDesktop ? 60 : 28,
                height: isDesktop ? 60 : 28,
                boxSizing: "border-box",
                border: "1px solid #707070",
              }}
              alt="profile-image"
              src={dummyPic}
            />
          </IconButton>
          <Menu
            anchorEl={menuUserProfile}
            open={Boolean(menuUserProfile)}
            onClose={() => setMenuUserProfile(null)}
          >
            <MenuItem key="log-out" onClick={() => onTappedLogout()}>
              Log out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
