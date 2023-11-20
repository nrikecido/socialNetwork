import SideFriends from "./sidebar/sideFriends";
import Main from "./sidebar/mainPosts";
import Profile from "./sidebar/profile";
import Friends from "../Social/modifyBar/friendList"
import DeleteAccount from "./modifyBar/deleteAccount";
import Logout from "./modifyBar/logout";
import ModifyData from "./modifyBar/modifyData";
import { useState } from "react";

const Content = () => {

  const [state, setState] = useState({
    module: <Main/>,
    button: true
  })

  const updateMain = (module) => {
    
    if (module === 'main') {setState({module: <Main/>, button: true});}

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