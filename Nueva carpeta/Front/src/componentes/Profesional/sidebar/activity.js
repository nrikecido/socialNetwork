import React, { useEffect, useState } from 'react';
import API from '../../../config/api';

const Activity = (props) => {

    const [state, setState] = useState({
        status: 'loading',
        events: []
    });

    useEffect(() => {
        API.get('/events/self')
            .then((result) => {
                setState({ ...state, status: 'loaded', events: result.data });
            })
    }, []);

    return (
        <div className="col-xl-3 find">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded">
                        <div className="d-flex align-items-center card-header">
                            <div className="ml-2">
                                <h3>Últimos eventos organizados</h3>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {state.events.map(event => (
                                    <div>
                                        <div className="card rounded mt-3">
                                            <div className="card-body">
                                                <p className='card-header'>Título: {event.title}</p>
                                                <p className='card-body'>Descripción: {event.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary m-2 form-control" onClick={() => {props.updateMain('events')}}>Ver todo</button><br />
                            <button className="btn btn-primary m-2 form-control" onClick={() => {props.updateMain('main')}}>Atrás</button><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Activity;
     