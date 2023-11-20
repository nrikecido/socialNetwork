import Activity from "./sidebar/activity";
import MainInfo from "./sidebar/mainInfo";
import SideInfo from "./sidebar/sideInfo";
import ModifyMain from "./modifyBar/modifyMain";
import Events from "../Quedadas/sidebar/main"
import { useState } from "react";

const Content = () => {

    const [state, setState] = useState({
        module: <MainInfo />
    })

    const updateMain = (module) => {
        if (module === 'main') {setState({...state, module: <MainInfo />})}

        if (module === 'events') {setState({...state, module: <Events />})}

        if (module === 'sideinfo') {setState({...state, module: <SideInfo />})}

        if (module === 'modifymain') {setState({...state, module: <ModifyMain />})}
    }

    return <> 
        <div className="row">
            <SideInfo updateMain={updateMain}></SideInfo>
            {state.module}
            <Activity updateMain={updateMain}></Activity>  
        </div>
    </>
};

export default Content;