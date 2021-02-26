import { PropsWithChildren } from "react";

import "./ContentWrapper.scss";

export default function ContentWrapper(props: PropsWithChildren<{}>) {
  return <section className="fdx_content-wrapper">{props.children}</section>
}
