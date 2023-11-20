import { useEffect, useState } from 'react';
import API from '../.././../config/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ModifyData = (props) => {

    const [state, setState] = useState({
        status: 'loading',
		data: []
    });

    useEffect(() => {
        API.get('/users/self')
            .then(result => {
                setState({ ...state, status: 'loaded', data: result.data });
            })
    }, []);

    const update = (field, value) =>{
        const newState = {...state}
        newState.data[field] = value;

        setState(newState);
    }

    const [message, setMessage] = useState('')

    const clean = () =>{
        setTimeout(()=>{
            setMessage('')
            props.updateMain('main')
        }, 3000)
    }

    const updateData = () =>{

        const obj = {
			email: state.data.email,
            description: state.data.description,
            nameSurname: state.data.nameSurname,
            birthDate: state.data.birthDate.slice(0,10),
            city: state.data.city,
            proInfo: state.data.proInfo,
            proContact: state.data.proContact,
            proSchedule: state.data.proSchedule,
            proPrices: state.data.proPrices,
            proOther: state.data.proOther
		}

		API.put("/users/", obj).then(data =>{

			if( data.status === true ){
                setMessage(<p className='bg-primary-subtle p-2 rounded'>Cambios guardados correctamente. Será redirigido a página principal</p>);
                clean();
			} else {
                setMessage(<p className='bg-primary-subtle p-2 rounded'>Ha ocurrido un error</p>);
            }
		})
    }

    return <>
    <div className="col-xl-6">
        <div className="row">
            <div className="col-md-12">
                <div className="card rounded form-control">
                    <p className="card-header">Datos personales</p>
                    <p>
                        Nombre y apellidos: <p className='bg-success-subtle rounded p-3 text-center'>{state.data.nameSurname}</p>
                        <input
                            type="text"
                            className="form-control rounded-input"
                            placeholder='Introduce nuevo nombre'
                            name="nameSurname"
                            value={state.data.nameSurname}
                            onChange={(event)=>{update("nameSurname", event.target.value)}}
                        />
                    </p>
                    <p>
                        Fecha nacimiento: <p className='bg-success-subtle rounded p-3 text-center'>{moment(state.data.birthDate).format('DD/MM/YYYY')}</p>
                        <input
                            type="date"
                            className="form-control rounded-input"
                            name="date"
                            value={state.data.birthDate}
                            onChange={(event)=>{update("birthDate", event.target.value)}}
                        />
                    </p>
                    <p>
                        Ciudad: <p className='bg-success-subtle rounded p-3 text-center'>{state.data.city}</p>
                        <input
                            type="text"
                            className="form-control rounded-input"
                            placeholder='Introduce ciudad'
                            name="city"
                            value={state.data.city}
                            onChange={(event)=>{update("city", event.target.value)}}
                        />
                    </p>

                    <p>
                        Correo: <p className='bg-success-subtle rounded p-3 text-center'>{state.data.email}</p>
                        <input
                            type="email"
                            className="form-control rounded-input"
                            placeholder='Introduce nuevo correo'
                            name="mail"
                            value={state.data.email}
                            onChange={(event)=>{update("email", event.target.value)}}
                        />
                    </p>
                    <p>
                        Web: <p className='bg-success-subtle rounded p-3 text-center'>{}Próximamente</p>
                        <input
                            type="text"
                            className="form-control rounded-input"
                            placeholder='Introduce nueva web'
                            name="mail"
                        />
                    </p>
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <div className="card rounded form-control">
                    <p className="card-header">Datos de perfil</p>
                    <p>
                        Foto: <p className='bg-success-subtle rounded p-3 text-center'>{}Próximamente</p>
                        <input
                            type="file"
                            className="form-control rounded-input"
                            name="photo"
                            //value={state.nameSurname}
                            //onChange={(event)=>{update("nameSurname", event.target.value)}}
                        />
                    </p>
                    <p>
                        Nombre usuario: <p className='bg-success-subtle rounded p-3 text-center'>{state.data.nameSurname}</p>
                        <input
                            type="text"
                            className="form-control rounded-input"
                            placeholder='Introduce nuevo nombre de usuario'
                            name="username"
                        />
                    </p>
                    <p>
                        Descripción: <p className='bg-success-subtle rounded p-3 text-center'>{state.data.description}</p>
                        <input
                            type="text"
                            className="form-control rounded-input"
                            placeholder='Introduce nueva descripción'
                            name="description"
                            value={state.data.description}
                            onChange={(event)=>{update("description", event.target.value)}}
                        />
                    </p>
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <div className="card rounded form-control">
                    <p className="card-header">Intereses</p>
                    <p>
                        Instrumentos y nivel <p className='bg-success-subtle rounded p-3 text-center'>Próximamente</p>
                        <input
                            type="text"
                            className="form-control rounded-input"
                            placeholder='Introduce nuevo instrumento'
                            name="instruments"
                        />
                    </p>
                    <p>
                        Estudios: <p className='bg-success-subtle rounded p-3 text-center'>Próximamente</p>
                        <input
                            type="text"
                            className="form-control rounded-input"
                            placeholder='Introduce nuevo estudio'
                            name="studies"
                            //value={putState.event.title}
                            //onChange={handleInputChange}
                        />
                    </p>
                    <button className='btn btn-primary' onClick={(updateData)}>Guardar</button>
                    {message}
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <div className="card rounded form-control">
                    <p className="card-header">Configuración</p>
                    <div>
                        <p className='btn btn-danger'>Borrar cuenta</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
};

export default ModifyData;