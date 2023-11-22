import React, { useEffect, useState } from 'react';
import API from '../../../config/api';
import { useNavigate, useParams } from 'react-router-dom';

const ModifyStory = () => {

    const {id} = useParams();

    const [state, setState] = useState({
        status: 'loading',
        story: []
    });

    useEffect(() => {
    API.get(`/stories/${id}`)
      .then(result => {
        setState({ status: 'loaded', story: result.data });
      })
    }, [id]);
    console.log(state.story)
  
    const update = (field, value) => {

        const newState = {...state};
        newState.story[field] = value;

        setState(newState);
        }

    const redirect = useNavigate();

    const [message, setMessage] = useState('')

    const clean = () =>{
        setTimeout(()=>{
        setMessage('')
        redirect('/')
        }, 3000)
    }

    const updateData = () => {

    const obj = {
      content: state.story.content
    }

    API.put(`/stories/${id}`, obj).then(data =>{

        if( data.status === true ){
            setMessage(<p className='bg-primary-subtle p-2 rounded'>Cambios guardados correctamente</p>);
            clean();
        } else {
            setMessage(<p className='bg-primary-subtle p-2 rounded'>Ha courrido un error. Inténtalo de nuevo</p>);
        }
        })
	}

  return (
    <div className="col-xl-12 modifystory" key={state.ModifyStory}>
      <h1 className="card body p-2 text-center m-1">Modificar story existente</h1>
      <div className="card rounded m-1 mt-3 ">
        <div className="d-flex">
          <div className="card-body form-control">
            <p>
              Contenido: <h3 className='bg-success-subtle rounded p-3 text-center'>{state.story.content}</h3>
              <input
                type="text"
                className="form-control rounded-input"
                placeholder='Introduce el nuevo título'
                name="content"
                value={state.story.content}
                onChange={(event)=>{update("content", event.target.value)}}
              />
            </p>
            <button className="btn btn-primary" onClick={updateData}>
              Publicar
            </button>
            {message}
            <button className="btn btn-primary">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyStory;
