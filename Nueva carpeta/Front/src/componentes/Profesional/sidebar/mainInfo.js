import Footer from '../../selectors/footer/selfFooter';
import OtherFooter from '../../selectors/footer/otherFooter'
import API from '../../../config/api';
import { useContext, useEffect, useState } from 'react';
import {ContextGlobal} from '../../../config/contextGlobal';

const MainInfo = () => {

    const [context, setContext] = useContext(ContextGlobal);

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
                                <h3>Datos</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>Aquí una información</p>
                    </div>
                    <div className="card-footer">
                        {context.user.ID === state.professional.ID &&<Footer></Footer>}
                        {context.user.ID !== state.professional.ID && <OtherFooter></OtherFooter>}
                    </div>
                </div>
                <div className="card rounded mt-3">
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            <div className="ml-2">
                                <h3>Clases</h3>
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
                        {context.user.ID === state.professional.ID &&<Footer></Footer>}
                        {context.user.ID !== state.professional.ID && <OtherFooter></OtherFooter>}
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
);
}
export default MainInfo;