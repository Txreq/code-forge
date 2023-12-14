"use client";

/* eslint-disable */
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const GlassCard: React.FC<Props> = (props) => {
  return (
    <div className={cn("glass-card", props.className)}>{props.children}</div>
  );
};
const GlassContent: React.FC<Props> = (props) => (
  <div className={cn("glass-content", "bg-background", props.className)}>
    {props.children}
  </div>
);

GlassCard.displayName = "GlassCard";
GlassContent.displayName = "GlassContent";

const Glass: React.FC<Props> = (props) => {
  const wrapperId = React.useId();

  useEffect(() => {
    document.getElementById(wrapperId)?.addEventListener("mousemove", (e) => {
      for (const card of document.getElementsByClassName("glass-card")) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty("--mouseX", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouseY", `${y}px`);
      }
    });
  });

  return (
    <div className={props.className} id={wrapperId}>
      {props.children}
    </div>
  );
};
Glass.displayName = "GlassWrapper";

export { Glass, GlassCard, GlassContent };
