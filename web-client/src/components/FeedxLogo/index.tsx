import { CSSProperties } from "react";
import logoImage from "../../images/logo-red.svg"

export default function FEEDxLogo(prop?: { style: Partial<CSSProperties> }) {
  let style = prop?.style || {};
  style = { width: 'auto', height: 'auto', ...style }
  return <img style={style} src={logoImage} alt="The FEEDx Logo" />
}
