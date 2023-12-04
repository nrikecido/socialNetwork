import Activity from "./sidebar/activity";
import MainInfo from "./sidebar/mainInfo";
import SideInfo from "./sidebar/sideInfo";
import ModifyMain from "./modifyBar/modifyMain";
import Events from "../Quedadas/sidebar/main"
import { useState } from "react";

const Content = () => {

    const [state, setState] = useState({
        module: <MainInfo />,
        button: true
    })

    const updateMain = (module) => {
        if (module === 'main') {setState({...state, module: <MainInfo />, button: true})}

        if (module === 'events') {setState({...state, module: <Events />, button: false})}

        if (module === 'sideinfo') {setState({...state, module: <SideInfo />, button: false})}

        if (module === 'modifymain') {setState({...state, module: <ModifyMain />, button: false})}
    }

    return <> 
        <div className="row">
            <SideInfo updateMain={updateMain} button={state.button}></SideInfo>
            {state.module}
            <Activity updateMain={updateMain} button= {state.button}></Activity>  
        </div>
    </>
};

export default Content;