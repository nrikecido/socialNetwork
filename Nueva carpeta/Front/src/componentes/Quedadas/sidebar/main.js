import '../css/estilos.css';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useContext } from 'react';
import { ContextGlobal } from '../../../config/contextGlobal';
import { Link } from 'react-router-dom';
import FooterSelf from '../../selectors/footer/selfFooter';
import Footer from '../../selectors/footer/otherFooter';
import GoFooter from '../../selectors/footer/goFooter';


const Main = (props) => {

    const [context, setContext] = useContext(ContextGlobal);

    const [state, setState] = useState({
		status: 'loading',
		events: []
	});
    console.log(props.updateMain)

	useEffect(()=>{
		API.get('/events/list').then(result => {
			setState({...state, status:"loaded", events: result.data});
		})
	}, []);

    const [message, setMessage] = useState(null);
    
    const eraseEvent =() => {
        setMessage(<p className='bg-danger rounded p-3'>Evento eliminado</p>)
        setTimeout(() =>{
            setMessage(null)
            window.location.reload()
        }, 3000)
    }

    const modify = () =>{
    }

    return <>
        <div className="col-xl-6">
            <h1 className='card body p-2 text-center'>Quedadas</h1>
            {
                state.events.map(events => {
                    return <div className="card rounded mt-3" key={events.ID}>
                    <div className='row p-3'>
                        <div className='col-md-6'>
                            <h4 className='card-header'>{events.title}</h4>
                            <h3>FOTO</h3>
                        </div>
                        <div className='card-body bg-info-subtle col-md-6'>
                            <p className='border-bottom border-primary'>Organizado por {events.nameSurname}</p>
                            <p className='border-bottom border-primary'>Programada para {moment(events.date).format("DD/MM/YYYY")}</p>
                            <p className='border-bottom border-primary'>Lugar: {events.GPS}</p>
                            <p className='border-bottom border-primary'>Descripción: {events.description}</p>
                            {context.user.ID === events.userID && <FooterSelf id={'/events/'+events.ID} erase={eraseEvent} modifys ={modify} dato={'event'} update={props.updateMain}/>}
                            {context.user.ID !== events.userID && <GoFooter id={'/eventgo/'+events.ID}/> }
                        </div>
                    </div>
                </div>
                })
            }{message}
        </div>
    </>
}

export default Main;