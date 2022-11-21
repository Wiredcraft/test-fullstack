import * as React from "react";

import "./index.css";
import { useLocation, useNavigate  } from "react-router-dom";
import Icon from "../Icon"

export default function Navi() {
    const navigate = useNavigate();
    const location  = useLocation();
    
    const jumpCreate = ()=>{
        navigate("/create")
    }

    const jumpList= ()=>{
        navigate("/")
    }

    const isRoot = React.useMemo(()=>location.pathname === '/',[location])

    return (
        <header className="navi">
            <span>Lightning Talks</span>
            { isRoot ? 
                <Icon name="icon-addto" color="#fff" onClick={jumpCreate}/>
                : <Icon name="icon-back" color="#fff" onClick={jumpList}/>
            }
        </header>
    );
}
