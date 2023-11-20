import Sabina from '../img/ha-sabina.jpeg';
import Footer from '../../selectors/footer/otherFooter';
import API from '../../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MainInfo = () => {

    const [state, setState] = useState({
		status: 'loading',
		professional: null
	});
    
	useEffect(() => {
        API.get('/users/self').then(result => {
            setState({ ...state, status: "loaded", professional: result.data });
            });
    }, []);
    
    return (
    <div className="col-xl-6">
        <div className="row">
            {state.status === 'loaded' && state.professional && (
                <div className="col-md-12">
                <h1 className="text-center bg-white rounded">{state.professional.proTitle}</h1>
                <div className="card rounded">
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            <div className="ml-2">
                                <h3>Instalaciones</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>
                            <h5>Fotos de las instalaciones</h5>
                            <img className="img-xs post-image p-2" src={Sabina} alt="profile"/>
                            <img className="img-xs post-image p-2" src={Sabina} alt="profile"/>
                        </div>
                        <div>
                            <h5>Descripción de las instalaciones:</h5>
                            <p>Nuestras instalaciones cuentan con....</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Footer></Footer>
                    </div>
                </div>
                <div className="card rounded mt-3">
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            <div className="ml-2">
                                <h3>Horarios y precios</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>
                            <p>Horarios de la Academia: {state.professional.proSchedule}</p>
                            <p>Precio por curso: {state.professional.proPrices}</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Footer></Footer>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
);
}
export default MainInfo;