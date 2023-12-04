import SideFriends from "./sidebar/sideFriends";
import Main from "./sidebar/mainPosts";
import Profile from "./sidebar/profile";
import Friends from "../Social/modifyBar/friendList";
import ModifyData from "./modifyBar/modifyData";
import { useState } from "react";

const Content = () => {

  const [state, setState] = useState({
    module: <Main/>,
    button: true,
    comment: false
  })

  const updateMain = (module) => {
    
    if (module === 'main') {setState({module: <Main />, button: true, comment: false});}

    if (module === 'friends') {setState({module: <Friends/>, button: false});}
    
    if (module === 'edit') {setState({module: <ModifyData updateMain={updateMain}/>, button: false});}
  }

  return <>
    <div className="row">
      <Profile updateMain= {updateMain} props={state.button}></Profile>
      {state.module}
      <SideFriends updateMain= {updateMain} props={state.button}></SideFriends>  
    </div>
  </>
};

export default Content;