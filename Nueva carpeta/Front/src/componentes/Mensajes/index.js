import Conversations from "./sidebar/conversations";
import Contacts from "./sidebar/contacts";
import MainConversation from "./sidebar/mainConversation";
import { useState } from "react";

const Content = () => {

    const [state, setState] = useState(null)

    const pickConver = (ID) => {

        setState(ID);
    }
    
    return  <>
        <div className="row">
            <Conversations pickConver= {pickConver}></Conversations>
            <MainConversation state= {state}></MainConversation>
            <Contacts pickConver= {pickConver}></Contacts>
        </div>
    </>    
};

export default Content;