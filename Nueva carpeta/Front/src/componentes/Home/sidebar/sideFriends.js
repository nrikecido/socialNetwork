import Avatar from '../img/avatar.svg';
import '../css/estilo.css';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SideFriends = (props) => {

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
        <div className="col-xl-3 suggested">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded">
                        <div className="card-body">
                            <h4 className="card-title border-bottom">Amigos</h4>
                            {state.friends.map(friends => {
                                return <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <div className="d-flex align-items-center" key={friends.userID}>
                                    <img className="img-xs rounded-circle" src={Avatar} alt="profile" />
                                    <div className="ml-2">
                                        <p><Link to={`app/profile/${friends.userID}`} className="btn" id="profile">{friends.friendName}</Link></p>
                                        <p className="tx-11 text-muted">12 Mutual Friends</p>
                                    </div>
                                </div>
                            </div>
                            })}
                        </div>
                        <button className='btn btn-primary m-2' onClick={() => {props.updateMain('friends')}}>Ver todos</button>
                        {props.props === false &&<button className='btn btn-primary m-2' onClick={() => {props.updateMain('main')}}>Atrás</button>}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SideFriends;