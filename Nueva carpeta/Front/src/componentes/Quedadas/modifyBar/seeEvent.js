import Avatar from '../img/avatar.svg';
import '../css/estilos.css';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SeeEvent = (props) => {
  const [state, setState] = useState({
    status: 'loading',
    events: [],
  });

  useEffect(() => {
    API.get('/events').then(result => {
      setState({ status: "loaded", events: result.data });
    });
  }, []);

  if (state.status === 'loading') {
    return <p>Cargando...</p>;
  }

  return (
    <div className="col-xl-6">
      {state.events.map(event => (
        <div key={event.id} className="card rounded m-1 mt-3">
          <div className="d-flex">
            <div>
              <div className='card-body'>
                <h1 className='card-body p-2 text-center m-1'>{event.title}</h1>
                <p>Organizado por {event.organizr}</p>
                <p>{event.date}</p>
                <p>Lugar: {event.location}</p>
                <p>Estado: {event.status}</p>
                <div>
                  <Link to={`/quedadas/modifyEvent/${event.id}`}>Modificar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeeEvent;
