"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => console.log("Signed out successfully"))
      .catch((error) => console.error("Sign-out error:", error));
  };

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "var(--navbar-bg, #ffffff)",
        color: "var(--navbar-text, #1f2937)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Desktop */}
          <Link href="/" className="hidden md:flex items-center mr-4">
            <Image
              src="/assets/imgs/logo1.png"
              alt="Logo"
              width={110}
              height={110}
              priority
            />
          </Link>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(219,39,119,0.08)" },
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-base font-medium text-pink-600"
                  >
                    {link.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo Mobile */}
          <Link href="/" className="flex md:hidden items-center mr-4">
            <Image
              src="/assets/imgs/logo1.png"
              alt="Logo"
              width={90}
              height={90}
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ul className="flex gap-6 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base font-medium text-gray-800 hover:text-pink-600 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Cart Icon */}
            <Link href="/cart" passHref>
              <IconButton
                color="inherit"
                sx={{
                  position: "relative",
                  "&:hover": { color: "#db2777" },
                  transition: "color 0.3s ease",
                }}
              >
                <AddShoppingCartIcon sx={{ fontSize: 28 }} />
                {cartItems.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      backgroundColor: "#db2777",
                      color: "#fff",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </IconButton>
            </Link>

            {/* Profile Icon */}
            <Link href="/login" passHref>
              <IconButton
                color="inherit"
                sx={{
                  "&:hover": { color: "#db2777" },
                  transition: "color 0.3s ease",
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
