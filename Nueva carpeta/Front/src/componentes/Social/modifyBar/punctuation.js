import Avatar from '../img/avatar.svg';
import '../css/estilos.css';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const { created } = require('../../../config/utils');

const Punctuation = () => {

    const [state, setState] = useState({
		status: 'loading',
		votes: []
	});

	useEffect(()=>{
		API.get('/votes/list').then(result => {
			setState({...state, status:"loaded", votes: result.data});
		})
	}, []);

    console.log(state)

    return <>
        <div className="col-xl-6">
            <h1 className='card body p-2 text-center'>Puntuaciones</h1>
            {
            state.votes.map(votes => {
                return <div className="card rounded p-3 m-1">
                <div className="d-flex">
                    <img className="rounded-circle main-profile-image" src={Avatar} alt="profile" />
                    <div className="ml-2">
                        <h4>{votes.evento}</h4>
                        <p><Link to={'app/quedadas/'+votes.eventID} className='btn' id='profile'>{votes.usuario}</Link></p>
                        <p>Valoración: {votes.valoration}</p>
                    </div>
                </div>
            </div>
            }
            )}
        </div>
    </>
}

export default Punctuation;