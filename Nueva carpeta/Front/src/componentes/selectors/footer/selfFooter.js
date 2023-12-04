import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import API from '../../../config/api'
import { useNavigate } from 'react-router-dom'

const FooterSelf = ({id, erase, dato}) => {
    
    const navigate = useNavigate();

    const eraseEvent = () =>{
        API.delete(id)
        erase()
    }

    const modifyPost = () => {
        if (dato === 'post'){
            console.log('modificando '+id)
            navigate('/app/home/modify'+id)
        } else if (dato === 'event'){
            navigate('/app/quedadas/modify'+id)
            console.log('estoy dando a modificar evento')
        }
    }

    return <div className="container p-2">
        <button className='btn' title='Editar' onClick={()=> modifyPost()}><FontAwesomeIcon icon={faPen} className='p-2'/></button>
        <button className='btn' title='Eliminar' onClick={()=> eraseEvent()}><FontAwesomeIcon icon={faTrash} className='p-2'/></button>
        <button className='btn' title='Comentarios'><FontAwesomeIcon icon={faComment} className='p-2'/></button>
    </div>
}

export default FooterSelf;