import  '../style/loginStyle.css';
import imglogin  from "../assets/logonegro.png";
import imgbodylogin from "../assets/bodyLogin.png"
import { Link } from 'react-router-dom';
import { useState } from 'react'
import query from '../api/axios.js'
import Modal from 'react-bootstrap/Modal';

function LoginPages() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setPassword] = useState('');
    const [documento, setDocumento] = useState('');
    const [preguntas, setPreguntas] = useState([]);
    const [respuestaUsuario, setRespuestaUsuario] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [pregunta, setPregunta] = useState(0);
    const [intentos, setIntentos] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const verificarDocumento = async () => {
        try {
            const { data } = await query.get(`/usuarios/${documento}`);
    
            // Verifica si el rol del usuario es Administrador
            if (data.rolUsuario === 1) {
                const { data: dataPreguntas } = await query.get('/preguntas');
                setPreguntas(dataPreguntas);
                setShowModal(true); // Mostrar el modal de preguntas de seguridad
            } else {
                alert('Solo los administradores pueden cambiar su contraseña');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const verificarRespuesta = async () => {
    //     try {
    //         const { data } = await query.get(`/respuesta-pregunta/${preguntas[pregunta].id}`);

    //         if (data.respuesta === respuestaUsuario) {
    //             // Lógica para permitir al usuario restablecer la contraseña
    //             alert('Respuesta correcta. Puede restablecer su contraseña ahora.');
    //         } else {
    //             alert('La respuesta es incorrecta. Inténtelo de nuevo.');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    
    const [showDocumentModal, setShowDocumentModal] = useState(true);

    const handleDocumentModalOpen = () => {
        setShowDocumentModal(true);
    };

    const handleDocumentModalClose = () => {
        setShowDocumentModal(false);
    };

    const handleDocumentModalSubmit = async () => {
        await verificarDocumento();
        handleDocumentModalClose();
    };

    const verificarRespuesta = async () => {
        try {
            const { data } = await query.get(`/respuesta-pregunta${preguntas[pregunta].id}`);

            if (data.respuesta === respuestaUsuario) {
                if (pregunta < preguntas.length - 1) {
                    setPregunta(pregunta + 1);
                } else {
                    setPregunta(preguntas.length);
                }
                setIntentos(0);
            } else {
                if (intentos < 2) {
                    setIntentos(intentos + 1);
                    alert('La respuesta es incorrecta');
                } else {
                    alert('Has alcanzado el límite de intentos. Por favor, espera 30 minutos antes de intentarlo de nuevo.');
                    setTimeout(() => {
                        setIntentos(0);
                        alert('Puedes intentarlo de nuevo');
                    }, 1800000); // 30 minutos en milisegundos
                }
                cambiarContrasena();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const cambiarContrasena = async () => {
        try {
            const response = await query.put(`/usuarios${documento}`, {
                password: nuevaContrasena,
            });

            if (response.status === 200) {
                window.location.href = '/home-admin';
            } else {
                alert('No se pudo cambiar la contraseña');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setShowModal(true);
    };

    const iniciarSesion = async (event) => {
        event.preventDefault();
        try {
            const { data } = await query.post('/usuarios/inicio-sesion', {
                correo,
                contrasena,
            });

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('rol', data.rol)
                localStorage.setItem('numeroDocumento', data.numeroDocumento)

                if(data.rol ===  'Administrador'){
                    window.location.href = '/home-admin';
                }
                else{
                    window.location.href = '/home-cajero';
                }
            } else {
                alert('Correo o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalSubmit = async () => {
        try {
            const response = await query.put(`/usuarios${documento}`, {
                contrasena: nuevaContrasena,
            });

            if (response.status === 200) {
                alert('Contraseña cambiada exitosamente');
                handleModalClose();
            } else {
                alert('No se pudo cambiar la contraseña');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-page">
            <img src={imgbodylogin} alt="Imagen de fondo" className="bg-image" />
            <div className="login-container">
                <img src={imglogin} alt="Logo" className="logo" />
                <form className="login-form" onSubmit={iniciarSesion}>
                    <div>
                        <label htmlFor="usuario">Usuario</label>
                        <input type="text" id="usuario" name="usuario" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
                        <label htmlFor="contrasena">Contraseña</label>
                        <input type="password" id="contrasena" name="contrasena" required value={contrasena} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='text'>
                        <Link to="" onClick={handleDocumentModalOpen}>Olvidar Contraseña</Link>
                    </div>
                    <button type="submit">Ingresar</button>
                </form>

                {/* <Modal show={showDocumentModal} onHide={handleDocumentModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ingrese su número de documento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleDocumentModalSubmit}>Aceptar</button>
                    </Modal.Footer>
                </Modal>

        
                <Modal show={pregunta > 0 && pregunta <= preguntas.length} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Pregunta de seguridad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{preguntas[pregunta - 1]}</p>
                        <input type="text" value={respuestaUsuario} onChange={(e) => setRespuestaUsuario(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={verificarRespuesta}>Siguiente</button>
                    </Modal.Footer>
                </Modal>

                <Modal show={pregunta > preguntas.length} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cambiar Contraseña</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="nuevaContrasena">Nueva Contraseña</label>
                        <input type="password" id="nuevaContrasena" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} />
                        <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
                        <input type="password" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleModalSubmit}>Aceptar</button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        </div>
    );
}

export default LoginPages;
