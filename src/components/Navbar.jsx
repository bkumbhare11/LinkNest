import React from "react";
import lightlogo1 from "../assets/lightlogo1.png";
import lightlogo from "../assets/lightlogo.png";
import darklogo from "../assets/darklogo.png";
import darklogo1 from "../assets/darklogo1.png";
import HamburgerMenu from "./HamburgerMenu";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  const { theme } = useTheme();

  return (
    <div className="sticky top-0 z-10 bg-white/60 backdrop-blur-md dark:bg-black/60 dark:backdrop-blur-lg ">
      <div className="px-4 py-1.5 sm:px-10 flex border-b border-neutral-400 justify-between ">
        <Link to="/">
          <img
            src={theme === "dark" ? lightlogo1 : darklogo1}
            alt=""
            className="w-10 sm:hidden"
          />

          <img
            src={theme === "dark" ? lightlogo : darklogo}
            alt=""
            className="w-25 hidden sm:block"
          />
        </Link>

        <div className="flex  sm:gap-4 items-center">
          <div className="flex items-center  mr-2">
            <ThemeToggle />
            <p className="sm:hidden block">
              <HamburgerMenu />
            </p>
          </div>

          <div className="hidden sm:flex gap-2.5 text-2xl font-bold ">
            <Link to="/">Home</Link>
            <Link to="/favourite">Favourites </Link>
          </div>

          <header className="flex items-center">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        </div>

        {console.log("current Theme:", theme)}
      </div>
    </div>
  );
}

export default Navbar;
