import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <div className="not_found">
            <div className='nf-cover'>
                <div className='top'>
                    <span><i className="icofont-eaten-fish"></i></span>
                </div>
                <div className='bottom'>
                    <h2>error 404 !</h2>
                    <p>sorry page isn't found...</p>
                    <Link to="/">Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
