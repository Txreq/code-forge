"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Motion {
  init_x: string;
  final_x: string;
  flip: boolean;
}

const DEFAULT_MOTION_DATA = {
  init_x: "-30%%",
  final_x: "100%",
  flip: false,
} as Motion;

export const MovingLine = (props: {
  height: number;
  width: number;
  cellSize: number;
}) => {
  const [row, setRow] = useState(0);
  const [{ init_x, final_x, flip }, setMotion] =
    useState<Motion>(DEFAULT_MOTION_DATA);

  useEffect(() => {
    setInterval(() => {
      if (Math.round(Math.random())) {
        setMotion(() => ({
          init_x: "100%",
          final_x: "-30%",
          flip: true,
        }));
      } else {
        setMotion(() => DEFAULT_MOTION_DATA);
      }

      setRow(
        Math.floor(Math.ceil(props.height / props.cellSize) * Math.random()) *
          props.cellSize,
      );
    }, 5000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <>
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(0)">
          <stop
            offset="10%"
            stopColor={flip ? "var(--neon)" : "var(--background)"}
          />
          <stop
            offset="100%"
            stopColor={flip ? "var(--background)" : "var(--neon)"}
          />
        </linearGradient>
      </defs>
      <motion.rect
        width="200"
        height="1"
        initial={{
          x: init_x,
          scaleX: 0,
        }}
        animate={{ x: final_x, scaleX: 1 }}
        transition={{ delay: 0, duration: 5, repeat: Infinity }}
        className="shadow-lg shadow-green-400"
        y={row}
        fill="url(#gradient)"
      />
    </>
  );
};
