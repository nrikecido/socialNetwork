// https://fontawesome.com/v5/docs/web/use-with/react
// https://fontawesome.com/search?o=r&m=free&s=solid&f=classic
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
    return <div className="container p-2">
        <button className='btn' title='Comenta!'><FontAwesomeIcon icon={faComment} className='p-2'/></button>
        <button className='btn' title='¡Comparte!'><FontAwesomeIcon icon={faRetweet} className='p-2'/></button>
        <button className='btn' title='¡Like!'><FontAwesomeIcon icon={faHeart} className='p-2'/></button>
    </div>
}

export default Footer;
