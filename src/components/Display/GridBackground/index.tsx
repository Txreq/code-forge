import { cn } from "@/lib/utils";
import { MovingLine } from "./MovingLine";

interface GridBackgroundProps {
  width: number;
  height: number;
  stroke?: number;
  cellSize: number;
  className?: string;
}

export default function GridBackground({
  width,
  height,
  stroke = 2,
  cellSize,
}: GridBackgroundProps) {
  const verticalLines: Array<React.ReactNode> = [];
  const horizontalLines: Array<React.ReactNode> = [];

  const className = "stroke-accent";

  for (let y = 0; y < Math.ceil(height / cellSize); y++) {
    verticalLines.push(
      <line
        key={y + 1}
        className={className}
        style={{
          strokeWidth: stroke.toString(),
        }}
        x1={0}
        x2={width}
        y1={y * cellSize}
        y2={y * cellSize}
      ></line>,
    );
  }

  for (let x = 0; x < Math.ceil(width / cellSize); x++) {
    horizontalLines.push(
      <line
        key={x + 1}
        className={className}
        style={{
          strokeWidth: stroke.toString(),
        }}
        x1={x * cellSize}
        x2={x * cellSize}
        y1={0}
        y2={height}
      ></line>,
    );
  }

  return (
    <svg height={height} width={width} className={cn("relative", className)}>
      {verticalLines.map((elem) => elem)}
      {horizontalLines.map((elem) => elem)}
      <MovingLine width={width} height={height} cellSize={cellSize} />
    </svg>
  );
}
