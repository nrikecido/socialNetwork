import React, { useEffect, useState } from 'react';
import API from '../../../config/api';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const ModifyEvent = () => {
  
  const { id } = useParams();

  const [state, setState] = useState({
    status: 'loading',
    event: []
  });

  useEffect(() => {
    API.get('/events/'+ id)
      .then(result => {
        setState({ status: 'loaded', event: result.data[0] });
      })
  }, [id]);

  const update = (field, value) => {

		const newState = {...state};
		newState.event[field] = value;

		setState(newState);
	}

  const redirect = useNavigate();

  const [message, setMessage] = useState('')

    const clean = () =>{
        setTimeout(()=>{
            setMessage('')
            redirect('/app/quedadas')
        }, 3000)
    }

  const updateData = () => {

		const obj = {
			title: state.event.title,
			description: state.event.description,
      date: state.event.date.slice(0, 10),
      duration: state.event.needed,
      capacity: state.event.capacity,
      email: state.event.title,
      GPS: state.event.GPS
		}

		API.put('/events/'+ id, obj).then(data =>{

			if( data.status === true ){
				setMessage(<p className='bg-primary-subtle p-2 rounded'>Cambios guardados correctamente</p>);
        clean();
			} else {
        console.log('no se ha modificado')
      }
		})
	}

  return (
    <div className="col-xl-6" key={state.ModifyEvent}>
      <h1 className="card body p-2 text-center m-1">Modificar evento existente</h1>
      <div className="card rounded m-1 mt-3">
        <h4 className="card-header">Información general</h4>
        <div className="d-flex">
          <div className="card-body form-control">
            <p>
              Título: <h3 className='bg-success-subtle rounded p-3 text-center'>{state.event.title}</h3>
              <input
                type="text"
                className="form-control rounded-input"
                placeholder='Introduce el nuevo título'
                name="title"
                value={state.event.title}
                onChange={(event)=>{update("title", event.target.value)}}
              />
            </p>
            <p>
              Descripción: <h3 className='bg-success-subtle rounded p-3 text-center'>{state.event.description}</h3>
              <input
                type="text"
                className="form-control rounded-input"
                placeholder='Introduce la nueva descripción'
                name="description"
                value={state.event.description}
                onChange={(event)=>{update("description", event.target.value)}}
              />
            </p>
            <p>Fecha: <h3 className='bg-success-subtle rounded p-3 text-center'>{state.event.date}</h3>
              <input
                type="date"
                className="form-control rounded-input"
                placeholder='Introduce la nueva fecha'
                name="date"
                value={state.event.date}
                onChange={(event)=>{update("date", event.target.value)}}
              />
            </p>
            <p>Duración: <h3 className='bg-success-subtle rounded p-3 text-center'>{state.event.duration} horas</h3>
              <input
                type="text"
                className="form-control rounded-input"
                placeholder='Introduce la nueva duración'
                name="duration"
                value={state.event.duration}
                onChange={(event)=>{update("duration", event.target.value)}}
              />
            </p>
            <p>Necesario: <h3 className='bg-success-subtle rounded p-3 text-center'>{state.event.needed}</h3>
              <input
                type="text"
                className="form-control rounded-input"
                placeholder='Introduce el nuevo material necesario'
                name="needed"
                value={state.event.needed}
                onChange={(event)=>{update("needed", event.target.value)}}
              />
            </p>
            <p>Capacidad: <h3 className='bg-success-subtle rounded p-3 text-center'>{state.event.capacity}</h3>
              <input
                type="text"
                className="form-control rounded-input"
                placeholder='Introduce la nueva capacidad'
                name="capacity"
                value={state.event.capacity}
                onChange={(event)=>{update("capacity", event.target.value)}}
              />
            </p>
            <p>GPS: <h3 className='bg-success-subtle rounded p-3 text-center'>{state.event.GPS}</h3>
              <input
                type="text"
                className="form-control rounded-input"
                placeholder='Introduce el nuevo sitio'
                name="GPS"
                value={state.event.GPS}
                onChange={(event)=>{update("GPS", event.target.value)}}
              />
            </p>
            <button className="btn btn-primary" onClick={updateData}>
              Publicar
            </button>
            {message}
            <button className="btn btn-primary">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyEvent;
