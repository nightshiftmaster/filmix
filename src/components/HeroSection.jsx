import React from "react";
import { motion } from "motion/react";
import { fadeIn } from "../motion/variants";

export default function HeroSection() {
  return (
    <div className="relative z-10 md:h-[55vh] h-[40vh] w-full shrink-0 overflow-visible">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.webp"
          alt="hero"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 md:top-20 top-30 flex flex-col justify-center items-center h-[calc(100%-5rem)]">
        <motion.h1
          className="text-white md:text-6xl text-4xl font-bold text-center"
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0 }}
        >
          The best movies
        </motion.h1>
        <motion.h1
          className="text-white md:text-6xl text-4xl font-bold text-center"
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0 }}
        >
          in one place
        </motion.h1>
      </div>
    </div>
  );
}
