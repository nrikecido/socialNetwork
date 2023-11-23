import React, { useState } from "react";
import Modify from "./sidebar/modify";
import SideInfo from "./sidebar/sideInfo"
import Main from "./sidebar/main";
import CreateEvent from "./modifyBar/createEvent";
import ModifyEvent from "./modifyBar/modifyEvent";

const Content = () => {

    const updateMain = (module) => {
        
        if (module === 'createEvent') {setState({ ...state, module: <CreateEvent updateMain={updateMain}/>, button: false });}

        if (module === 'main') {setState({ ...state, module: <Main updateMain={updateMain}/>, button: true });}

        if (module === 'modify') (setState({...state, module: <ModifyEvent />, button: true}))
    }

    const [state, setState] = useState({
        module: <Main updateMain={updateMain}/>,
        button: true
    });
    
    return <>
        <div className="row">
            <Modify updateMain={updateMain} button={state.button}></Modify>
            {state.module}
            <SideInfo updateMain={updateMain} ></SideInfo>  
        </div>
    </>
};

export default Content;