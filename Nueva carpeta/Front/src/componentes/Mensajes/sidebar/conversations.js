import API from '../../../config/api';
import { useEffect, useState } from 'react';
const { created } = require('../../../config/utils');

const Conversations = (props) => {

    const [state, setState] = useState({
		status: 'loading',
		messages: []
	});

	useEffect(() => {
    API.get('/messages/list').then(result => {
        setState({ ...state, status: "loaded", messages: result.result });
        });
    }, []);
    
    if(state.messages === undefined){
        return <div className="col-xl-3">
                <div className="card rounded">
                    <div className="card-body">
                        <p>LISTA CONVERSACIONES</p>
                        <p>Selecciona a un contacto de tu lista de amigos para empezar a enviar mensajes</p>
                    </div>
                </div>
            </div>
    }

    return <>
    <div className="col-xl-3">
        <div className="card rounded">
            <div className="card-body">
                <p>LISTA CONVERSACIONES</p>
                {
                    state.messages.map(messages =>{
                        return (
                            <p key={messages.ID} className="border rounded">
                              {messages.OtherPartyName} dice: {messages.content}
                              <span className="tx-11 text-muted"> hace {created(messages.created)}</span>
                              <button className='btn' onClick={()=> props.pickConver(messages.OtherPartyID)}> Enviar mensaje</button>
                            </p>
                          );
                          
                    })
                }
            </div>
        </div>
    </div>
    </>
};

export default Conversations;