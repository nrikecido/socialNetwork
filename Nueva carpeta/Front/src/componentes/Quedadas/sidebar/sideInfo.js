import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario = () => {
    return <>
        <div className="col-xl-3">
            <div className="col-md-12">
                <div className="calendario">
                    <Calendar />
                </div>       
            </div>
        </div>
        
    </>
}

export default Calendario;