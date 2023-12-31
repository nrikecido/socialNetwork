import Avatar from '../img/avatar.svg';
import '../css/estilo.css';
import Footer from '../../selectors/footer/otherFooter';
import FooterSelf from '../../selectors/footer/selfFooter';
import API from '../../../config/api';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextGlobal } from '../../../config/contextGlobal';
const { created } = require('../../../config/utils');

const Main = () => {

    const [context, setContext] = useContext(ContextGlobal);
    
    const [state, setState] = useState({
        status: 'loading',
        posts: []
    });

    useEffect(() => {
        API.get('/stories/list').then(result => {
            setState({ ...state, status: "loaded", posts: result.data });
        });
    }, []);

	const ordenaPosts = [...state.posts].sort((a, b) => {
		return new Date(b.created) - new Date(a.created);
	});

	const updatePost = (e) =>{
		setState({...state, content:e.target.value})
	}

	const loadPosts = () => {
        API.get('/stories/list')
            .then((result) => {
            	setState({ status: 'loaded', posts: result.data });
        }) 
    };

	const [successPost, setSuccessMessage] = useState(null);

	const clean = () => {
		setSuccessMessage(null);
	};

	const publishPost = () => {
        if (state.content !== undefined) {
            API.post('/stories/', { content: state.content })
                .then(() => {
                    if (updatePost) {
                        loadPosts();
                        setState({ ...state, content: '' });
                        setSuccessMessage('Post publicado');
                        setTimeout(() => {
                            clean();
                        }, 3000);
                    }
                });
        } else {
            setSuccessMessage('No hay nada que publicar');
			setTimeout(() => {
				clean();
			}, 3000);
        }
    };

	const [message, setMessage] = useState(null);
    
    const eraseEvent =() => {
        setMessage(<p className='bg-danger rounded p-3'>Publicación eliminada</p>)
        setTimeout(() =>{
            setMessage(null)
            window.location.reload()
        }, 3000)
    }

	const modify = ()=>{}

    return <>
        <div className="col-xl-6">
            <div className="row">
                <div className="col-md-12 posts">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <h4>¿En qué estás pensando?</h4>
                                <input
									type="text"
									className="form-control rounded-input"
									id="publicacion"
									placeholder="Escribe aquí tu post"
									value={state.content}
									onChange={updatePost}
									/>
                            </div>
                            <button className="btn">Adjuntar Foto o Video</button>
                            <button className="btn btn-primary" onClick={publishPost}>Publicar</button>
							{successPost && <div className='succes-post bg-success p-3 rounded text-center'>{successPost}</div>}
                        </div>
                    </div>
                </div>

				{
					ordenaPosts.map(post => {
						return <div key={post.ID} className="col-md-12 posts mt-3">
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
								{context.user.ID == post.userID &&<FooterSelf id={('/stories/'+post.ID)} erase={eraseEvent} modifys ={modify} dato={'post'}/>}
								{context.user.ID !== post.userID &&<Footer />}
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