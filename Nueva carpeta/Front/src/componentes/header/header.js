import './header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../config/api';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const [isHidden, setIsHidden] = useState(true);

    const mostrar = () => {
        setIsHidden(!isHidden);
    };

    const redirect = useNavigate()

    const logout = () =>{
        API.remove_token('token')
        redirect('/musin')
    }

    return <>
        <div className="logo rounded container">
            <h1 className="gray-shade text-white text-center p-5">musIN</h1>
        </div>
        <div className="container links">
            <div className="m-3 text-center">
                <button className="btn btn-primary m-1"><Link className="text-white" to="/app/home">Principal</Link></button>
                <button className="btn btn-primary m-1"><Link className="text-white" to="/app/social">Social</Link></button>
                <button className="btn btn-primary m-1"><Link className="text-white" to="/app/quedadas">Quedadas</Link></button>
                <button className="btn btn-primary m-1"><Link className="text-white" to="/app/profesional">Profesional</Link></button>
                <button className="btn btn-primary m-1"><Link className="text-white" to="/app/mensajes">Mensajes</Link></button>
                <button className="btn btn-primary m-1" title="Cerrar sesión" onClick={()=>mostrar()}>Logout</button>
                {!isHidden &&<div><button className='btn btn-danger' onClick={() => {logout()}}>Pulsa aquí si estás seguro/a de cerrar sesión</button></div>}
            </div>
        </div>
    </>
};
    
export default Header;
    