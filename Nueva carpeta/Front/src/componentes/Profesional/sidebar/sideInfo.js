import Avatar from '../img/avatar.svg';
import '../css/estilos.css';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const SideInfo = (props) => {

    const [state, setState] = useState({
		status: 'loading',
		professional: null
	});

	useEffect(()=>{

		API.get('/users/self').then(result => {
			setState({...state, status:"loaded", professional: result.data});
		})

	}, []);

    console.log(state)

    return <>
        <div className="col-xl-3">
            <div className="card rounded">
                {state.status === 'loaded' && state.professional && (
                <div className="card-body">
                    <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile"/>
                    <div className="p-2 border-bottom">
                        <h5 className="mt-5">Información profesional:</h5>
                        <p className="justify-content-center">{state.professional.proDescription}</p>
                    </div>
                    <div className="p-2 border-bottom">
                        <p>Experiencia:</p>
                        <p>- {state.professional.proInfo}</p>
                    </div>
                    <div className="p-2 border-bottom">
                        <p>Métodos de contacto:</p>
                        <p>- Móvil: {state.professional.proContact}</p>
                        <p>- Correo: {state.professional.email}</p>
                    </div>
                    <div className="p-2 border-bottom">
                        <ul>Redes sociales
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Twitter</li>
                        </ul>
                    </div>
                    {props.button &&<button className="btn btn-primary m-2 form-control" onClick={() => {props.updateMain('modifymain')}}>Editar</button>}<br />
                    {props.button === false &&<button className="btn btn-primary m-2 form-control" onClick={() => {props.updateMain('main')}}>Atrás</button>}
                </div>
            )}
            </div>
        </div>
    </>
}

export default SideInfo;