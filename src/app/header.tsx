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
import { useState, useEffect } from "react";
import getNavMenuItems from "./components/getNavmenu";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<{ title: string; link: string }[]>(
    []
  );
  const [navTitle, setNavTitle] = useState<string>("");
  const theme = useTheme();

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { title, items } = await getNavMenuItems();
      setMenuItems(items);
      setNavTitle(title);
    };
    fetchMenuItems();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="navmenu" sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(to right, #ece9e6, #ffffff)" }}>
        <Toolbar>
          <Typography
            variant="h1"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              fontWeight: "bold",
              color: theme.palette.secondary.main,
              padding: "0.5rem 1rem",
              textAlign: "center",
            }}>
            {navTitle}
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
            {menuItems.map((item) => (
              <MenuItem key={item.link} onClick={handleMenuClose}>
                <Link href={item.link}>{item.title}</Link>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
