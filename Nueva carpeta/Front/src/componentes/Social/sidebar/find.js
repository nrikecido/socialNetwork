import Avatar from '../img/avatar.svg';
import '../css/estilos.css';

const Find = (props) => {
    return <>
        <div className="col-xl-3 find">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-2">
                        <h6 className="card-title">Busca gente, quedadas y grupos cerca</h6>
                        <input type="text" name="" id="" placeholder="Busca aquí" />
                    </div>
                    <div className="card rounded mt-3">
                        <h6 className="card-header">Gente cerca</h6>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <div className="d-flex align-items-center">
                                    <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile" />
                                    <div className="ml-2">
                                        <p>Antonio</p>
                                        <p className="tx-11 text-muted">12 Mutual Friends</p>
                                    </div>
                                </div>
                                <button className="btn btn-icon">Añadir</button>
                            </div>
                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <div className="d-flex align-items-center">
                                    <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile" />
                                    <div className="ml-2">
                                        <p>Antonio</p>
                                        <p className="tx-11 text-muted">12 Mutual Friends</p>
                                    </div>
                                </div>
                                <button className="btn btn-icon">Añadir</button>
                            </div>
                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <div className="d-flex align-items-center ">
                                    <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile" />
                                    <div className="ml-2">
                                        <p>Antonio</p>
                                        <p className="tx-11 text-muted">12 Mutual Friends</p>
                                    </div>
                                </div>
                                <button className="btn btn-icon">Añadir</button>
                            </div>
                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <div className="d-flex align-items-center">
                                    <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile" />
                                    <div className="ml-2">
                                        <p>Antonio</p>
                                        <p className="tx-11 text-muted">12 Mutual Friends</p>
                                    </div>
                                </div>
                                <button className="btn btn-icon">Añadir</button>
                            </div>
                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <div className="d-flex align-items-center">
                                    <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile" />
                                    <div className="ml-2">
                                        <p>Antonio</p>
                                        <p className="tx-11 text-muted">12 Mutual Friends</p>
                                    </div>
                                </div>
                                <button className="btn btn-icon">Añadir</button>
                            </div>
                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <div className="d-flex align-items-center">
                                    <img className="img-xs rounded-circle profile-image" src={Avatar} alt="profile" />
                                    <div className="ml-2">
                                        <p>Antonio</p>
                                        <p className="tx-11 text-muted">12 Mutual Friends</p>
                                    </div>
                                </div>
                                <button className="btn btn-icon">Añadir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
}

export default Find;