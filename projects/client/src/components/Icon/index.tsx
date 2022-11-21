import * as React from "react";
import "./index.css";
import "../../font/iconfont.js";

interface Props {
    name: string;
    color?: string;
    onClick?: (arg:any) => void;
}

export default function Icon({ name, color = "#364e50", onClick}: Props) {
    return (
        <svg className="icon" aria-hidden="true" style={{ color }} onClick={onClick}>
            <use xlinkHref={`#${name}`} />
        </svg>
    );
}
