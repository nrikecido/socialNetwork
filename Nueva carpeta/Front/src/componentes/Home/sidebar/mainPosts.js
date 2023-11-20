import Avatar from '../img/avatar.svg';
import '../css/estilo.css';
import Footer from '../../selectors/footer/otherFooter';
import FooterSelf from '../../selectors/footer/selfFooter';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextGlobal } from '../../../config/contextGlobal';
const { created } = require('../../../config/utils');

const Main = () => {

    const [context, setContext] = useContext(ContextGlobal);
    
    const [state, setState] = useState({
        status: 'loading',
        posts: []
    });

    useEffect(() => {
        API.get('/stories/').then(result => {
            setState({ ...state, status: "loaded", posts: result.data });
        });
    }, []);

	const ordenaPosts = [...state.posts].sort((a, b) => {
		return new Date(b.created) - new Date(a.created);
	});

	const updatePost = (e) =>{
		setState({...state, content:e.target.value})
	}

	const [comment, setComment] = useState({
		comment: false
	})

	const showComment = () =>{
		setComment({...comment, comment: true})
	}

	const noComment = () =>{
		setComment({...comment, comment: false})
	}

	const loadPosts = () => {
        API.get('/stories/')
            .then((result) => {
            	setState({ status: 'loaded', posts: result.data });
        }) 
    };

	const [successPost, setSuccessMessage] = useState('');

	const clean = () => {
		setSuccessMessage('');
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
						return <div className="col-md-12 posts mt-3">
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
								{context.user.ID == post.userID &&<FooterSelf id={('/stories/'+post.ID)} />}
								{context.user.ID !== post.userID &&<Footer />}
								{comment.comment === false &&<button className='btn btn-primary' onClick={()=> showComment()}>Ver comentarios</button>}
								{comment.comment &&<button className='btn btn-primary' onClick={()=> noComment()}>Ocultar</button>}
								{comment.comment && <div className='p-2'><p>{post.commentName}</p><p>{post.comment}</p></div>}
							</div>
						</div>
					</div>
					})
				}
            </div>
        </div>
        
    </>
}

export default Main;