import React, { useState } from "react";
import Modify from "./sidebar/modify";
import SideInfo from "./sidebar/sideInfo"
import Main from "./sidebar/main";
import CreateEvent from "./modifyBar/createEvent";
import SeeEvent from "./modifyBar/seeEvent";
import ModifyEvent from "./modifyBar/modifyEvent";

const Content = () => {

    const [state, setState] = useState({
        module: <Main />
    });
    
    const updateMain = (module) => {
        
        if (module === 'createEvent') {setState({ ...state, module: <CreateEvent /> });}

        if (module === 'seeEvent') {setState({ ...state, module: <SeeEvent /> });}

        if (module === 'main') {setState({ ...state, module: <Main /> });}
    }
    console.log(state)

    return <>
        <div className="row">
            <Modify updateMain={updateMain} ></Modify>
            {state.module}
            <SideInfo updateMain={updateMain} ></SideInfo>  
        </div>
    </>
};

export default Content;