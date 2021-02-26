import FlexWrapper from "containers/BaseWrappers/FlexWrapper";
import { PropsWithChildren } from "react";

export default function PageTitle({ children }: PropsWithChildren<{}>) {
  return <FlexWrapper tagName="header">{children}</FlexWrapper>
}
