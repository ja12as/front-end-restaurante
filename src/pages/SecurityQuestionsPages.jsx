
import { Link } from 'react-router-dom';

function SecurityQuestionsPages() {

    const history = Link();

    const handleClick = () => {
        history.push('/'); // Navegar de regreso a la página de inicio (Home)
    };
    
    return (
        <div>
            <h2>pregunta</h2>
            <p>Esta es tu página de pregunta .</p>
            <button onClick={handleClick}>Regresar a Login</button>
        </div>
    )
}

export default SecurityQuestionsPages
