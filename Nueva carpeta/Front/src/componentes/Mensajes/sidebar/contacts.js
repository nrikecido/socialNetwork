import Avatar from '../img/avatar.svg';
import '../css/estilos.css';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Contacts = (props) => {

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
    <div className="col-xl-3">
        <div className="row">
            <div className="col-md-12 card rounded contacts">
                <h4 className='card-header'>Contactos</h4>
                <div className="card-body">
                {
                state.friends.map(friends  => {
                    return <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <div className="d-flex align-items-center">
                            <img className="img-xs rounded-circle" src={Avatar} alt="profile"/>
                            <div className="ml-2">
                                <p>{friends.friendName}</p>
                            </div>
                        </div>
                        <button className="btn btn-icon" onClick={() => props.pickConver(friends.ID)}>Enviar mensaje</button>
                    </div>
                    })}
                </div>
            </div>
        </div>
    </div>
    </>
};

export default Contacts;