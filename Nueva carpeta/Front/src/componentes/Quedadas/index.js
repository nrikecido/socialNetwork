import React, { useState } from "react";
import Modify from "./sidebar/modify";
import SideInfo from "./sidebar/sideInfo"
import Main from "./sidebar/main";
import CreateEvent from "./modifyBar/createEvent";
import SeeEvent from "./modifyBar/seeEvent";
import ModifyEvent from "./modifyBar/modifyEvent";

const Content = () => {

    const [state, setState] = useState({
        module: <Main />,
        button: true
    });
    
    const updateMain = (module) => {
        
        if (module === 'createEvent') {setState({ ...state, module: <CreateEvent />, button: false });}

        if (module === 'seeEvent') {setState({ ...state, module: <SeeEvent />, button: false });}

        if (module === 'main') {setState({ ...state, module: <Main />, button: true });}
    }
    console.log('sss', state)

    return <>
        <div className="row">
            <Modify updateMain={updateMain} button={state.button}></Modify>
            {state.module}
            <SideInfo updateMain={updateMain} ></SideInfo>  
        </div>
    </>
};

export default Content;