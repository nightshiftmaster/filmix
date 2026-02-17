import React from "react";
import { Link } from "react-router";

export default function BackHomeButton() {
  return (
    <Link
      to="/"
      data-section="back-home"
      className="inline-block text-white bg-white/10 hover:bg-white/20 mb-6 border w-fit mx-auto border-white/10 px-6 py-3 rounded-lg focus-within:outline-2 focus-within:outline-cyan-300 focus-within:animate-[tabsFocusPulse_1.2s_ease-in-out_infinite]"
    >
      ← Back to home
    </Link>
  );
}
