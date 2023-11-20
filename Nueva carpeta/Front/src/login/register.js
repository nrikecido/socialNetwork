import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from '../config/api';

const Register = () => {

	const [state, setState] = useState({
		nameSurname: '',
		email: '',
		password: '',
		description: '',
		birthDate: '',
		city: ''
	});

	const redirect = useNavigate();

	const [message, setMessage] = useState('')

	const register = () => {

		const userData = {
			nameSurname: state.nameSurname,
			email: state.email,
			password: state.password,
			description: state.description,
			birthDate: state.birthDate,
			city: state.city,
			presentation: state.presentation
		}

		API.post('/users/', userData)
			.then(data =>{
				if (data.status === true){
					redirect('/')
				} else {
					setMessage(<h3 className="bg-danger p-2 rounded">Ha habido algún error. Prueba de nuevo</h3>)
			}
		})
	}

    return<>
    <section className="h-100">
		<div className="container h-100">
			<div className="row justify-content-sm-center h-100">
				<div className="text-center my-5 logo-musin">
					<h1>musIN</h1>
				</div>
				<div className="card shadow-lg">
					<div className="card-body p-5">
						<h1 className="fs-4 card-title fw-bold mb-4">Registro</h1>
						<div>
							{message}
							<p className="mb-3">
								<label className="mb-2 text-muted">Nombre</label>
								<input id="name" 
								type="text" 
								className="form-control" 
								name="name" 
								value={state.nameSurname}
								onChange={(e) => setState({ ...state, nameSurname: e.target.value })}
								required />
							</p>
							<p className="mb-3">
								<label className="mb-2 text-muted">Correo electrónico</label>
								<input id="email" 
								type="email" 
								className="form-control" 
								name="email" 
								value={state.email}
								onChange={(e) => setState({...state, email: e.target.value})}
								required />
							</p>
							<p className="mb-3">
								<label className="mb-2 text-muted">Password</label>
								<input id="password" 
								type="password" 
								className="form-control" 
								name="password"
								value={state.password}
								onChange={(e) => setState({...state, password: e.target.value})}
								required />
							</p>
							<p className="mb-3">
								<label className="mb-2 text-muted">Descripción</label>
								<input id="descripcion" 
								type="text" 
								className="form-control" 
								name="descripcion" 
								value={state.description}
								onChange={(e) => setState({ ...state, description: e.target.value })}
								required />
							</p>
							<p className="mb-3">
								<label className="mb-2 text-muted">Fecha nacimiento</label>
								<input id="birthDate" 
								type="date" 
								className="form-control" 
								name="birthDate" 
								value={state.birthDate}
								onChange={(e) => setState({ ...state, birthDate: e.target.value })}
								required />
							</p>
							<p className="mb-3">
								<label className="mb-2 text-muted" for="name">Ciudad</label>
								<input id="name" 
								type="text" 
								className="form-control" 
								name="name" 
								value={state.city}
								onChange={(e) => setState({ ...state, city: e.target.value })}
								required />
							</p>
							<p className="mb-3">
								<label className="mb-2 text-muted" for="name">Presentación</label>
								<input id="name" 
								type="text" 
								className="form-control" 
								name="name" 
								value={state.presentation}
								onChange={(e) => setState({ ...state, presentation: e.target.value })}
								required />
							</p>
							<p className="align-items-center d-flex">
								<button onClick={() => register()} className="btn btn-primary ms-auto">
									Registrarse	
								</button>
							</p>
						</div>
					</div>
					<div className="card-footer py-3 border-0">
						<div className="text-center">
							¿Ya tienes una cuenta? <button className="btn m-1"><Link to="/login/">Ir al Login</Link></button>
						</div>
					</div>
				</div>
				<div className="text-center mt-5 text-muted">
					Copyright 2023 Mi Compañía 
				</div>
			</div>
		</div>
	</section>
    
    </>
}

export default Register;