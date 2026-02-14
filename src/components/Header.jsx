import { Link } from "react-router-dom";
import React from "react";
import Search from "./Search";

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed flex md:flex-row flex-col gap-7 md:gap-0  items-center top-0 left-0 md:right-[7vw] right-0 z-50 py-5 px-8 md:px-12 drop-shadow-md bg-black/40 ">
      <Link to="/" onClick={scrollToTop}>
        <h1 className="text-white md:text-5xl text-4xl font-bold">Filmix</h1>
      </Link>
      <Search />
    </header>
  );
}
