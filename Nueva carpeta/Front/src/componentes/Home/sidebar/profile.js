import Avatar from '../img/avatar.svg'
import '../css/estilo.css';
import moment from 'moment';
import { useContext } from 'react';
import { ContextGlobal } from '../../../config/contextGlobal';

const Profile = (props) => {

	const [context, setContext] = useContext(ContextGlobal);

    return  <>
        <div className="col-xl-3">
            <div className="card rounded">
                <div className="card-body profile">
                    <div className="d-flex">
                        <img className="img-fluid rounded-circle" src={Avatar} alt="profile"/>
                    </div>
                    <h4>{context.user.name}</h4>
                    <h5 className="mt-5">Sobre mí:</h5>
                    <p className="justify-content-center">{context.user.description}</p>
                    <div className="mt-3">
                        <p>FECHA DE NACIMIENTO:</p>
                        <p className="text-muted">{moment(context.user.birthdate).format("DD/MM/YYYY")}</p>
                    </div>
                    <div className="mt-3">
                        <p>CIUDAD:</p>
                        <p className="text-muted">{context.user.city}</p>
                    </div>
                    <div className="mt-3">
                        <p>EMAIL:</p>
                        <p className="text-muted">{context.user.email}</p>
                    </div>
                    <div className="mt-3">
                        <p>CONTACTO:</p>
                        <p className="text-muted">{context.user.procontact}</p>
                    </div>
                    {props.props &&<button className='btn btn-primary m-2 form-control' onClick={() => {props.updateMain('edit')}}>Editar perfil</button>}<br/>
                    {props.props === false &&<button className='btn btn-primary m-2 form-control' onClick={() => {props.updateMain('main')}}>Atrás</button>}
                </div>
            </div>
        </div>
    </>
}

export default Profile;