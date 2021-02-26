import { CSSProperties, PropsWithChildren } from "react";
import { PropWithTagName } from "./base-wrappers";
import Bloc from "./Bloc";

type FlexOptions = Pick<CSSProperties, "flexDirection" | "alignItems" | "justifyContent">;
type FlexWrapperProps = PropsWithChildren<PropWithTagName<FlexOptions>>;

export default function FlexWrapper({ tagName, children, ...flexOptions }: FlexWrapperProps) {
  const style: CSSProperties = { display: 'flex', ...flexOptions };

  tagName = tagName || "div";
  return <Bloc className='fdx-flex' style={style} noBorderRadius noBoxShadow>{children}</Bloc>
}
