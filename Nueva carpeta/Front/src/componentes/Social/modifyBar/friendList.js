import Avatar from '../img/avatar.svg';
import '../css/estilos.css';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const { created } = require('../../../config/utils');

const Friends = () => {

    const [state, setState] = useState({
		status: 'loading',
		friends: []
	});

	useEffect(()=>{

		API.get('/friends/list').then(result => {
			setState({...state, status:"loaded", friends: result.data});
		})

	}, []);

    return <>
        <div className="col-xl-6">
            <h1 className='card body p-2 text-center'>Tus amigos</h1>
            {
                state.friends.map(friends  => {
                    return <div className="card rounded p-3 mt-3">
                        <div className="d-flex">
                                <img className="rounded-circle main-profile-image" src={Avatar} alt="profile" />
                                <div className="ml-2">
                                    <h4>{friends.friendName}</h4>
                                    <p>{friends.presentation}</p>
                                    <p>Amigos desde hace un año</p>
                                </div>
                                <button className='btn'>Ver perfil</button>
                            </div>
                    
                        </div>
                    }
                )
            }
           
        </div>
    </>
}

export default Friends;