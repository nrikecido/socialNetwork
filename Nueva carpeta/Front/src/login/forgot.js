import { Link } from "react-router-dom";
import {state, useEffect, useState} from 'react';
import API from "../config/api";
import { useNavigate } from "react-router-dom";

const Forgot = () => {

	const [state, setState] = useState({
		nameSurname: '',
		email: ''
	})

	const saveData = (field, value) => {

		const newState = {...state};
		newState[field] = value;

		setState(newState);
	}

	const redirect = useNavigate();

	const [message, setMessage] = useState('');

	const noData = () =>{
		setMessage(<p className="bg-danger p-3 rounded">El usuario no existe. Prueba de nuevo</p>)
		setTimeout(() => {
			setMessage('')
		}, 3000)
	}

	const isData = () =>{
		setMessage(<p className="bg-danger p-3 rounded">Se te ha enviado un correo. Entra para recuperar la contraseña.</p>)
		setTimeout(() => {
			setMessage('')
		}, 3000)
		redirect('/musin')
	}

	const sendData = () =>{

		const obj= {
			nameSurname: state.nameSurname,
			email: state.email
		}

		API.post('/users/reset', obj).then(data=>{
			if( data.status === true){
				isData()
			} else {
				noData();
			}
		})
	}

	return <>
	<section className="h-100">
		<div className="container h-100">
			<div className="row justify-content-sm-center h-100">
				<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
				<div className="text-center my-5 logo-musin">
						<h1>musIN</h1>
					</div>
					<div className="card shadow-lg">
						<div className="card-body p-5">
							<h1 className="fs-4 card-title fw-bold mb-4">Contraseña olvidada</h1>
							<div className="needs-validation">
								<div className="mb-3">
									<label className="mb-2 text-muted">Nombre</label>
									<input 
									id="nameSurname" 
									type="text" 
									className="form-control" 
									name="nameSurname" 
									value= {state.nameSurname}
									onChange={(event)=>{saveData("nameSurname", event.target.value)}}
									/>
									<div className="invalid-feedback">
										Email is invalid
									</div>
								</div>

								<div className="mb-3">
									<label className="text-muted">Correo electrónico</label>
									<input 
									id="email" 
									type="email" 
									className="form-control" 
									name="email" 
									value={state.email}
									onChange={(event)=>{saveData("email", event.target.value)}} 
									/>
								    <div className="invalid-feedback">
								    	Password is required
							    	</div>
								</div>

								<div className="d-flex align-items-center">
									<button type="submit" className="btn btn-primary ms-auto" onClick={sendData}>
										Enviar link	
									</button>
								</div>
								{message}
							</div>
						</div>
						<div className="card-footer py-3 border-0">
							<div className="text-center">
								¿Has recordado tu contraseña? <button className="btn m-1"><Link to="/musin">Ir al Login</Link></button>
							</div>
						</div>
					</div>
					<div className="text-center mt-5 text-muted">
						Copyright 2023 Mi compañía 
					</div>
				</div>
			</div>
		</div>
	</section>

	</>
};

export default Forgot;