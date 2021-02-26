import { CSSProperties, PropsWithChildren } from "react";
import Bloc from "./Bloc";

type CircleProps = PropsWithChildren<{
  radius: number; // number in px
}>

export default function Circle({ radius, children }: CircleProps) {
  const circleStyle: CSSProperties = {
    borderRadius: `${radius}px`,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
  }

  return <Bloc className="fdx-circle" style={circleStyle}>{children}</Bloc>
}
