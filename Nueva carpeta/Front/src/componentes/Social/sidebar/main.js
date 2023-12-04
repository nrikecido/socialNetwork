import Avatar from '../img/avatar.svg';
import '../css/estilos.css';
import Sabina from '../img/ha-sabina.jpeg';
import Footer from '../../selectors/footer/otherFooter';
import FooterSelf from '../../selectors/footer/selfFooter';
import API from '../../../config/api';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextGlobal } from '../../../config/contextGlobal';
const { created } = require('../../../config/utils');

const Main = () => {

	const [context, setContext] = useContext(ContextGlobal);

    const [state, setState] = useState({
		status: 'loading',
		posts: []
	});

	useEffect(()=>{
		API.get('/stories/list')
		.then(result => {
			setState({...state, status:"loaded", posts: result.data});
		})
	}, []);

	const [message, setMessage] = useState(null);
    
    const eraseEvent =() => {
        setMessage(<p className='bg-danger rounded p-3'>Publicación eliminada</p>)
        setTimeout(() =>{
            setMessage(null)
            window.location.reload()
        }, 3000)
    }

	const ordenaPosts = [...state.posts].sort((a, b) => {
		return new Date(b.created) - new Date(a.created);
	});

	if (!state.posts || state.posts.length === 0) {
		return <div className="col-xl-6 main">
		<div className="row card">
			<div className="col-md-12 posts p-3">
				<div className="card rounded">
					<div className="card-header">
						<div className="d-flex align-items-center">
							<div className="ml-2">
								<p>Comienza a publicar</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	}

    return <>
        <div className="col-xl-6 main">
            <div className="row card">
                {
					ordenaPosts.map(post => {
						return <div key={ordenaPosts.ID} className="col-md-12 posts mt-3">
						<div className="card rounded">
							<div className="card-header">
								<div className="d-flex align-items-center">
									<img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile"/>
									<div className="ml-2">
										<p><Link to={'app/perfil/'+post.userID} className='btn' id='profile'>{post.nameSurname}</Link></p>
										<p className="tx-11 text-muted">Hace { created(post.created) }</p>
									</div>
								</div>
							</div>
							<div className="card-body">
								<p className="mb-3 tx-14">{post.content}</p>
							</div>
							<div className="card-footer">
								{context.user.ID === post.userID &&<FooterSelf erase={eraseEvent} id={'/stories/'+post.ID} />}
								{context.user.ID !== post.userID &&<Footer /> }
							</div>
						</div>
					</div>
					})
				}{message}
            </div>
        </div>
        
    </>
}

export default Main;