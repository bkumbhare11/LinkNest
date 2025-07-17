import React from "react";
import Navbar from "./components/Navbar";

import Links from "./pages/Home";
import Favourite from "./pages/Favourite";
import Error from "./pages/Error";
import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import { Toaster } from "react-hot-toast";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <>
      <SignedIn>
        <Navbar />

        <Routes>
          <Route path="/" element={<Links />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Intro />
      </SignedOut>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
