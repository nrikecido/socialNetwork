import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import API from './../../../config/api';
import {ContextGlobal} from '../../../config/contextGlobal';
import React, { useState, useContext } from 'react';

const FooterSelf = ({id}) => {

    const [context, setContext] = useContext(ContextGlobal);

    const comment = () => {
        setContext({...context, comment: true})
    }
    
    const modificar = () => {
        setContext({...context, modificar: true})
    }

    const borrar = () =>{
        API.delete(id)
    }

    return <div className="container p-2">
        <button className='btn' title='Editar' onClick={()=> modificar()}><FontAwesomeIcon icon={faPen} className='p-2'/></button>
        <button className='btn' title='Eliminar' onClick={()=> borrar()}><FontAwesomeIcon icon={faTrash} className='p-2'/></button>
        <button className='btn' title='Comentarios' onClick={()=> comment()}><FontAwesomeIcon icon={faComment} className='p-2'/></button>
    </div>
}

export default FooterSelf;