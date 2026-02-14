export const fadeIn = (direction, delay = 0) => {
  const fromCenter = direction === "center" || direction == null;
  return {
    hidden: {
      y: fromCenter
        ? 0
        : direction === "up"
          ? 40
          : direction === "down"
            ? -40
            : 0,
      x: fromCenter
        ? 0
        : direction === "left"
          ? 40
          : direction === "right"
            ? -40
            : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: fromCenter ? 1.8 : 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
