import { useState } from 'react';
import API from '../config/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
  

const Login = () => {

	const [state, setState] = useState({
		email: "",
		password: ""
	});

	const redirect = useNavigate();

	const saveData = (field, value) => {

		const newState = {...state};
		newState[field] = value;

		setState(newState);
	}

	const canSendLogin = () => {

		return ( state.email.length > 3 && state.password.length > 3  );

	}

	const sendLogin = () => {

		const obj = {
			email: state.email,
			password: state.password
		}

		API.post("/users/login", obj).then(data =>{

			if( data.status === true ){
				API.save_token(data.data);
				redirect('/');
			}
		})
	}

	return  <>
	<section className="h-100">
		<div className="container h-100">
			<div className="row justify-content-sm-center h-100">
				<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
					<div className="text-center my-5 logo-musin">
						<h1>musIN</h1>
					</div>
					<div className="card shadow-lg">
						<div className="card-body p-5">
							<h1 className="fs-4 card-title fw-bold mb-4 text-center">LOGIN</h1>
							<form method="POST" className="needs-validation">
								<div className="mb-3">
									<label className="mb-2 text-muted">Correo electrónico</label>
									<input 
									id="email" 
									type="email" 
									className="form-control" 
									name="email" 
									value={state.email} 
									onChange={(event)=>{saveData("email", event.target.value)}} required />
									<div className="invalid-feedback">
										Email is invalid
									</div>
								</div>

								<div className="mb-3">
									<label className="text-muted">Password</label>
									<input id="password" type="password" className="form-control" name="password" value={state.password} onChange={(event)=>{saveData("password", event.target.value)}}  required />
								    <div className="invalid-feedback">
								    	Password is required
							    	</div>
								</div>
								<div className="mb-2 w-100">
									<button className="btn m-1"><Link to="/login/forgot">¿Olvidaste tu contraseña?</Link></button>
								</div>

								<div className="d-flex align-items-center">
									<div className="form-check">
										<input type="checkbox" name="remember" id="remember" className="form-check-input" />
										<label className="form-check-label">Recuérdame</label>
									</div>
									<button type="button" className="btn btn-primary ms-auto" onClick={sendLogin} disabled={!canSendLogin()}>
										Login
									</button>
								</div>
							</form>
						</div>
						<div className="card-footer py-3 border-0">
							<div className="text-center">
								¿Aún no tienes una cuenta? <button className="btn m-1"><Link to="/login/register">¡Crea una!</Link></button>
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

export default Login;
		

