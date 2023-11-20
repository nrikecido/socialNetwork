import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faCalendarXmark } from '@fortawesome/free-solid-svg-icons'
import API from './../../../config/api';

const GoFooter = ({id}) => {

    const eventGo = () =>{
        API.post(id)
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