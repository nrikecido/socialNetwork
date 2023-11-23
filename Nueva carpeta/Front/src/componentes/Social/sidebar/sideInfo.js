import Avatar from '../img/avatar.svg';
import '../css/estilos.css';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SideInfo = (props) => {

    const [friendsState, setFriendsState] = useState({
        status: 'loading',
        friends: []
    });

    const [votesState, setVotesState] = useState({
        status: 'loading',
        votes: []
    });

    useEffect(() => {
        // Realiza la solicitud para amigos
        API.get('/friends/list')
            .then(result => {
                setFriendsState({ status: 'loaded', friends: result.data });
            
        });

        API.get('/votes/list')
            .then(result => {
                setVotesState({ status: 'loaded', votes: result.data });
            })
        }, []);
    

    return <>
        <div className="col-xl-3 side">
            <div className="card rounded">
                <div className="card-body">
                    <div className="border rounded">
                        <h5 className="card-header">Tus amigos</h5>
                        <div className="p-2">
                            {friendsState.friends.map(friends => {
                            return <div key={friends.ID} className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                        <div className="d-flex align-items-center" key={friends.userID}>
                                            <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile" />
                                            <div className="ml-2">
                                            <p><Link to={`app/profile/${friends.userID}`} className="btn" id="profile">{friends.friendName}</Link></p>
                                            <p className="tx-11 text-muted">12 Mutual Friends</p>
                                            </div>
                                        </div>
                                    </div>
                            })}
                        </div>
                        <button className='btn btn-primary' onClick={()=> {props.updateMain('friendList')}}>Ver todos</button>
                        {props.button === false &&<button className='btn btn-primary' onClick={()=> {props.updateMain('main')}}>Atrás</button>}
                    </div>
                    
                    <div className="border rounded mt-3">
                        <h5 className="card-header">Puntuaciones</h5>
                        {
                        votesState.votes.map(votes => {
                            return <div className="p-2">
                            <div className="event">
                                <Link className="btn" to={'app/quedadas/'+votesState.eventID}><p>{votes.evento}<span className="badge bg-primary">{votes.valoration} Estrellas</span></p></Link>
                            </div>
                        </div>
                        })
                    }
                        <button className='btn btn-primary' onClick={()=> {props.updateMain('punctuation')}}>Ver puntuaciones</button>
                        {props.button === false &&<button className='btn btn-primary' onClick={()=> {props.updateMain('main')}}>Atrás</button>}
                    </div>
                    
                    <div className="border rounded mt-3">
                        <h5 className="card-header">Status</h5>
                        <div className="p-2">
                            <p>Principiante</p>
                        </div>
                    </div>
                    <button className='btn btn-primary' onClick={()=> {props.updateMain('near')}}>Buscar gente</button>
                </div>
            </div>
        </div>
        
</>
}

export default SideInfo;