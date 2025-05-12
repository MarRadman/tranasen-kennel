"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";

interface HeaderProps {
  navTitle: string;
  menuItems: { title: string; link: string }[];
}

const Header = ({ navTitle, menuItems }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="navmenu">
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(to right, #ece9e6, #ffffff)",
          zIndex: theme.zIndex.appBar,
        }}>
        <Toolbar>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              flexGrow: 1,
              color: theme.palette.secondary.main,
              padding: "0.5rem 1rem",
              textAlign: "center",
            }}>
            <Link href="/">{navTitle}</Link>
          </Typography>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: "auto" }}
            onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            className="navmenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}>
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <MenuItem
                  key={`${item.title}-${item.link}`}
                  onClick={handleMenuClose}>
                  <Link href={item.link}>{item.title}</Link>
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No menu items</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default Header;
