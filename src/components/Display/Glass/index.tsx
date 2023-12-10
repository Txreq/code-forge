/* eslint-disable */

import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<Props> = (props) => (
  <div className={cn(styles.card, props.className)}>{props.children}</div>
);
const Content: React.FC<Props> = (props) => (
  <div className={cn(styles.content, "bg-background", props.className)}>
    {props.children}
  </div>
);

Card.displayName = "GlassCard";
Content.displayName = "GlassContent";

const Wrapper: React.FC<Props> = (props) => {
  const wrapperId = React.useId();
  const cards = React.Children.toArray(props.children);

  useEffect(() => {
    document.getElementById(wrapperId)?.addEventListener("mousemove", (e) => {
      for (const card of document.getElementsByClassName(styles.card!)) {
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
      {cards.map((child) => {
        //@ts-expect-error displayName
        if (child?.valueOf().type.displayName != Card.displayName) {
          console.warn(
            `the ${Wrapper.displayName!} components expects its children to be a ${Card.displayName!}`,
            child,
          );
        } else {
          return child;
        }
      })}
    </div>
  );
};
Wrapper.displayName = "GlassWrapper";

export default { Wrapper, Card, Content };
