import * as React from "react";

import "./index.css";

interface Props {
    label: string ;
    value: string;
    onChange: (event: React.ChangeEvent) => void;
    type: "input" | "textarea";
    isRequired: boolean;
}

export default function Input({ label, value, onChange, type ="input", isRequired }: Props) {
    const [hasEdit, setHasEdit] = React.useState(false);

  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      setHasEdit(true);
      onChange(e);
    }

    return (
      <div className="input">
        <label>
            <span>{label}:</span>
            {type === "input" ? <input value={value} onChange={handleChange} /> : <textarea value={value} onChange={handleChange}/> }
        </label>
        <span className="hint">{hasEdit && isRequired && !value && "Required"}</span>
      </div>
    );
}
