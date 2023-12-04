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
            setState({ ...state, status: "loaded", messages: result.data });
            });
    }, []);

    const [message, setMessage] = useState(null)

    const deleteConver = (ID) => {
        API.delete('/messages/'+ID)
        setMessage(<p className='bg-danger'>Eliminando conversación...</p>)
        setTimeout(()=>{
            setMessage(null)
            window.location.reload()
        }, 3000)
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
                              <button className='btn' onClick={()=> deleteConver(messages.OtherPartyID)}>Eliminar conversación</button>
                            </p>
                          );
                          
                    })
                }{message}
            </div>
        </div>
    </div>
    </>
};

export default Conversations;