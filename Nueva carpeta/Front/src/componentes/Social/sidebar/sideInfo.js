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
        API.get('/friends/list')
            .then(result => {
                setFriendsState({ status: 'loaded', friends: result.data });
            })

        API.get('/votes/list')
            .then(result => {
                setVotesState({ status: 'loaded', votes: result.data });
            })
    }, []);

    return (
        <div className="col-xl-3 side">
            <div className="card rounded">
                <div className="card-body">
                    <div className="border rounded">
                        <h5 className="card-header">Tus amigos</h5>
                        <div className="p-2">
                            {friendsState.status === 'loading' && <p>Cargando amigos...</p>}
                            {friendsState.status === 'loaded' && (
                                <>
                                    {friendsState.friends.map(friend => (
                                        <div key={friend.ID} className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                            <div className="d-flex align-items-center" key={friend.userID}>
                                                <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile" />
                                                <div className="ml-2">
                                                    <p>
                                                        <Link to={`app/profile/${friend.userID}`} className="btn" id="profile">
                                                            {friend.friendName}
                                                        </Link>
                                                    </p>
                                                    <p className="tx-11 text-muted">12 Mutual Friends</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                            {friendsState.status === 'error' && <p>Error al cargar amigos.</p>}
                        </div>
                        {props.button &&<button className='btn btn-primary' onClick={() => { props.updateMain('friendList') }}>Ver todos</button>}
                        {props.button === false && <button className='btn btn-primary' onClick={() => { props.updateMain('main') }}>Atrás</button>}
                    </div>

                    <div className="border rounded mt-3">
                        <h5 className="card-header">Puntuaciones</h5>
                        {votesState.status === 'loading' && <p>Cargando puntuaciones...</p>}
                        {votesState.status === 'loaded' && votesState.votes && (
                            <>
                                {votesState.votes.map(vote => (
                                    <div key={vote.ID} className="p-2">
                                        <div className="event">
                                            <Link className="btn" to={`app/quedadas/${vote.eventID}`}>
                                                <p>{vote.evento}<span className="badge bg-primary">{vote.valoration} Estrellas</span></p>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {votesState.status === 'error' && <p>Error al cargar puntuaciones.</p>}
                        {props.button &&<button className='btn btn-primary' onClick={() => { props.updateMain('punctuation') }}>Ver puntuaciones</button>}
                        {props.button === false && <button className='btn btn-primary' onClick={() => { props.updateMain('main') }}>Atrás</button>}
                    </div>

                    <div className="border rounded mt-3">
                        <h5 className="card-header">Status</h5>
                        <div className="p-2">
                            <p>Principiante</p>
                        </div>
                    </div>
                    <button className='btn btn-primary' onClick={() => { props.updateMain('near') }}>Buscar gente</button>
                </div>
            </div>
        </div>
    );
}

export default SideInfo;
