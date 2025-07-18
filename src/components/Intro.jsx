import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useTheme } from "./ThemeProvider";
import lightlogo from "../assets/lightlogo.png";
import darklogo from "../assets/darklogo.png";
import ThemeToggle from "./ThemeToggle";

import { Particles } from "@/components/magicui/particles";

function Intro() {
  const { theme } = useTheme();
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <p className="fixed top-0 right-0 mx-5 my-1 z-20">
          <ThemeToggle />
        </p>

        <Particles
          className="absolute inset-0 -z-10"
          quantity={150}
          size={1}
          color={theme === "dark" ? "#ffffff" : "#222222"}
        />

        <div className="max-w-5xl sm:mx-auto my-10 mx-2 flex flex-col items-center p-2 relative z-10">
          <img
            src={theme === "dark" ? lightlogo : darklogo}
            alt=""
            className="w-[70%] sm:w-[40%]"
          />
          <h1 className="sm:text-4xl text-2xl mt-6">Welcome to LinkNest</h1>
          <p className="sm:text-lg text-sm text-gray-600 dark:text-gray-300 my-1 text-center">
            Your personal place to store, organize & access important links.
          </p>
          <p className="mt-2 sm:text-md text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
            Tired of losing important URLs? LinkNest helps you save, manage and
            retrieve all your useful links from one place — anytime, anywhere.
          </p>

          <header>
            <SignedOut>
              <SignInButton className="bg-black text-white dark:bg-white dark:text-black px-4 py-1 rounded font-semibold cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        </div>
      </div>
    </>
  );
}

export default Intro;
