"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useCart } from "@/context/CartContext";

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
    <AppBar position="static" sx={{ backgroundColor: "white", color: "#db2777" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Desktop */}
          <Link href="/" className="hidden md:flex items-center mr-4">
            <Image src="/assets/imgs/logo1.png" alt="Logo" width={100} height={100} />
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
                <MenuItem key={link.name} onClick={handleCloseNavMenu}>
                  <Link href={link.href} className="text-lg text-pink-600 hover:underline">
                    {link.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo Mobile */}
          <Link href="/" className="flex md:hidden items-center mr-4">
            <Image src="/assets/imgs/logo1.png" alt="Logo" width={80} height={80} />
          </Link>

          {/* Desktop Nav Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ul className="flex gap-6 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-lg text-pink-600 hover:border-b-2 border-pink-700"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/cart" passHref>
              <IconButton color="inherit" sx={{ position: "relative" }}>
                <AddShoppingCartIcon sx={{ fontSize: 30 }} />
                {cartItems.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "#db2777",
                      color: "#fff",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </IconButton>
            </Link>

            <Link href="/login" passHref>
              <IconButton color="inherit">
                <AccountCircleIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

