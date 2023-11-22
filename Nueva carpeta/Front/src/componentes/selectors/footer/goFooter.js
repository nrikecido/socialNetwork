import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faCalendarXmark } from '@fortawesome/free-solid-svg-icons'
import API from './../../../config/api';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { ContextGlobal } from '../../../config/contextGlobal';

const GoFooter = ({id}) => {

    const [context, setContext] = useContext(ContextGlobal)

    const [message, setMessage] = useState('')

    const eventGo = () =>{
        API.post(id)
        setMessage(<p>Te has apuntado al evento</p>)
    }

    const noGo = () => {
        API.delete(id)
    }

    return <div className="container p-2">
        <button className='btn' title='¡Apúntate!' onClick={()=> eventGo()}><FontAwesomeIcon icon={faCalendarCheck} className='p-2'/></button>
        <button className='btn' title='¡Elimina tu asistencia!' onClick={()=> noGo()}><FontAwesomeIcon icon={faCalendarXmark} className='p-2'/></button>
        </div>
}

export default GoFooter;