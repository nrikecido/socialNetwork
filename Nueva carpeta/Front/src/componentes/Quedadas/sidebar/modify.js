import API from "../../../config/api";
import { useEffect, useState } from "react";


const Modify = (props) => {


    const [state, setState] = useState({
        status: 'loading',
        events: []
    })

    useEffect(() =>{
        API.get('/eventgo/list').then(result=>{
            setState({...state, status: 'loaded', events: result.data})
        });
    }, [])

    console.log('modify', state)

    return <>
        <div className="col-xl-3">
            <div className="card rounded">
                <div className="card-body">
                    <div className="mt-3 card-header">
                        <div>
                            <button className="btn btn-primary" onClick={()=> {props.updateMain('createEvent')}}>Crear nuevo evento</button>
                        </div>
                        <div>
                            {props.button === false &&<button className="btn btn-primary" onClick={()=> {props.updateMain('main')}}>Cancelar</button>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card rounded mt-3">
                <div className="card-body">
                    <div className="mt-3 ">
                        <h2 className="card-header">Quedadas a las que acudirás</h2>
                        {(!state.events || state.events.length === 0) && <p>nada</p>}
                        {state.events.map(events => {
                            return <div key={events.ID} className="p-2">
                                <div className="border-bottom">
                                    <p>Título: {events.title}</p>
                                    <p>Programada para: {events.date.slice(0,10)}</p>
                                    <p>Organizada por: {events.nameSurname}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Modify;