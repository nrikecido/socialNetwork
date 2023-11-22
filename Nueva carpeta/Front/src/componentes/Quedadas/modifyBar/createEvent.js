import React, { useState, state } from 'react';
import API from '../../../config/api';


const CreateEvent = (props) => {
  
  const [message, setMessage] = useState('')

  const [state, setState] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    needed: '',
    capacity: '',
    GPS: '',
    valoration: '',
  });

  const mensaje = () => {
    setMessage(<p className='bg-success p-2 rounded'>Evento publicado correctamente</p>);
    setTimeout(() => {
      setMessage(null);
      props.updateMain('main');
    }, 3000);
  };

  const publishEvent = () => {
    const eventData = {
      title: state.title,
      description: state.description,
      date: state.date,
      duration: state.duration,
      needed: state.needed,
      capacity: state.capacity,
      GPS: state.GPS,
      valoration: state.valoration,
    };

    API.post('/events/', eventData)
      .then(() => {
        mensaje()
      })
      .catch((error) => {
        console.error('Error al publicar el evento:', error);
      }
    );
  };

  return (
    <div className="col-xl-6">
      <h1 className="card body p-2 text-center m-1">Crear un nuevo evento</h1>
      <div className="card rounded m-1 mt-3">
        <h4 className="card-header">Información general</h4>
        <div className="d-flex">
          <div className="card-body form-control">
          <p>
              Título:
              <input
                type="text"
                className="form-control rounded-input"
                id="title"
                placeholder="Escribe el título"
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
              />
            </p>
            <p>
              Descripción:
              <input
                type="text"
                className="form-control rounded-input"
                id="description"
                placeholder="Descripción del evento"
                value={state.description}
                onChange={(e) => setState({ ...state, description: e.target.value })}
              />
            </p>
            <p>Fecha: 
                <input  
                    type="date"
                    className="form-control rounded-input"
                    id="date"
                    placeholder="Escribe el título"
                    value={state.date}
                    onChange={(e) => setState({ ...state, date: e.target.value })} 
                />
            </p>
            <p>Duración: 
                <input  
                    type="text"
                    className="form-control rounded-input"
                    id="duration"
                    placeholder="Duración"
                    value={state.duration}
                    onChange={(e) => setState({ ...state, duration: e.target.value })} 
                />
            </p>
            <p>Necesario: 
                <input  
                    type="text"
                    className="form-control rounded-input"
                    id="needed"
                    placeholder="Necesario"
                    value={state.needed}
                    onChange={(e) => setState({ ...state, needed: e.target.value })} 
                />
            </p>
            <p>Capacidad: 
                <input  
                    type="text"
                    className="form-control rounded-input"
                    id="capacity"
                    placeholder="Capacidad"
                    value={state.capacity}
                    onChange={(e) => setState({ ...state, capacity: e.target.value })} 
                />
            </p>
            <p>GPS: 
                <input  
                    type="text"
                    className="form-control rounded-input"
                    id="GPS"
                    placeholder="Lugar"
                    value={state.GPS}
                    onChange={(e) => setState({ ...state, GPS: e.target.value })} 
                />
            </p>
            <p>Valoración: 
                <input  
                    type="text"
                    className="form-control rounded-input"
                    id="valoration"
                    placeholder="Valoración"
                    value={state.valoration}
                    onChange={(e) => setState({ ...state, valoration: e.target.value })} 
                />
            </p>
            <button className="btn btn-primary" onClick={publishEvent}>
              Publicar
            </button>
            <button onClick={()=> mensaje()}>ldldld</button>{message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
