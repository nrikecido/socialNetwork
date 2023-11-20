import React, { useState } from "react";
import Main from "./sidebar/main";
import Find from "./sidebar/find";
import SideInfo from "./sidebar/sideInfo";
import Near from "./modifyBar/near";
import Punctuation from "./modifyBar/punctuation";
import Friends from "./modifyBar/friendList";

const Content = () => {
    
    const [state, setState] = useState({
        module: <Main />,
        button: true
    });

    const updateMain = (module) => {
        
        if (module === 'friendList') {
            setState({ ...state, module: <Friends />, button: false });
        }

        if (module === 'punctuation') {
            setState({ ...state, module: <Punctuation />, button: false });
        }

        if (module === 'near') {
            setState({ ...state, module: <Near /> });
        }

        if (module === 'main') {
            setState({ ...state, module: <Main />, button: true});
        }
    }

    return (
        <div className="row">
            <SideInfo updateMain={updateMain} button={state.button} />
            {state.module}
            <Find />
        </div>
    );
};

export default Content;
