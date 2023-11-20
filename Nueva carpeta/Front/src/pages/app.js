import React, { useEffect } from "react";
import Header from '../componentes/header/header';
import { useContext } from 'react';
import { ContextGlobal } from '../config/contextGlobal';
import API from '../config/api';
import { useNavigate } from 'react-router-dom';


const Contenido = (props) => {

	const [context, setContext] = useContext(ContextGlobal);
	
	const navigate = useNavigate();

	useEffect(()=>{

		API.get('/users/self').then(d=>{
			if(d.status === true){
				setContext({...context, status: "loaded", user: d.data})
			}else{
				navigate('/login');
				// setContext({...context, status: "loaded"});		
			}
		})

	}, []);

	if(context.status === 'loading'){
		return <div>Loading...</div>
	}

    return <>
			<Header></Header>
			<div className="container">{props.children}</div>
		</>;
}

export default Contenido;