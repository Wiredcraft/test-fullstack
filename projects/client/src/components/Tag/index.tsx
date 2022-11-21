import * as React from "react";
import "./index.css";

interface Props {
    label: string;
    onClick?: (event: any) => void;
    actived: boolean;
}

export default function Tag({ label, onClick, actived = false}: Props) {
    return (
        <button onClick={onClick} type="button" className={`tag ${actived && 'actived'}`}>
            {label}
        </button>
    );
}
