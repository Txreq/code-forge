import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

const LoadingStyles = cva("animate-ping", {
  variants: {
    size: {
      lg: "h-24 w-24",
      md: "h-12 w-12",
      sm: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const Loading: React.FC<VariantProps<typeof LoadingStyles>> = ({ size }) => {
  return (
    <div className={LoadingStyles({ size })}>
      <Image src={"/images/alien.png"} fill alt="loading" />
    </div>
  );
};

export default Loading;
