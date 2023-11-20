import API from '../../../config/api';
import { useEffect, useState } from 'react';

const MainConversation = (props) => {
    
    const [state, setState] = useState({
        status: 'loading',
        messages: []
    });

    useEffect(() => {
        API.get('/messages/'+props.state).then(result => {
            setState({ ...state, status: "loaded", messages: result.result });
        });
    }, [props.state]);

    const [postState, setPostState] = useState({
        content: ''
    });

    const saveData = (field, value) => {
        setPostState({ ...postState, [field]: value });
    }

    const reloadMessages = () => {
        API.get('/messages/'+props.state).then(result => {
            setState({ ...state, status: "loaded", messages: result.result });
        });
    };

    const sendPost = () => {
        const obj = {
            content: postState.content
        }

        API.post('/messages/'+props.state, obj).then(data => {
            if (data.status === true) {
                reloadMessages();
                setPostState({ ...postState, content: '' });
            }
        })
    }

    if (state.messages === undefined){
        return (
            <div className="col-xl-6">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card rounded">
                            <h3 className="card-header">Mensajes </h3>
                            <div className="p-3 message-container">
                                Selecciona un contacto para empezar a mandar mensajes
                            </div>
                            <div className="card-body border rounded border-black bg-primary-subtle mt-4">
                            <textarea
                                name="content"
                                value={postState.content}
                                onChange={(event) => { saveData("content", event.target.value) }}
                                placeholder="Introduce tu mensaje"
                                rows="4"
                                cols="67">
                            </textarea>
                            <button className="btn btn-primary" onClick={sendPost}>Enviar mensaje</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="col-xl-6">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded">
                        <h3 className="card-header">Conversación</h3>
                        <div className="p-3 message-container">
                            {state.messages.map((message, index) => (
                                <p key={index}>{message.Sender}: {message.content}</p>
                            ))}
                        </div>
                        <div className="card-body border rounded border-black bg-primary-subtle mt-4">
                            <textarea
                                name="content"
                                value={postState.content}
                                onChange={(event) => { saveData("content", event.target.value) }}
                                placeholder="Introduce tu mensaje"
                                rows="4"
                                cols="67">
                            </textarea>
                            <button className="btn btn-primary" onClick={sendPost}>Enviar mensaje</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default MainConversation;
