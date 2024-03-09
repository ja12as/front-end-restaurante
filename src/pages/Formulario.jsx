import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [fecha, setFecha] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [correo, setCorreo] = useState('');
    const [tiposDocumento, setTiposDocumento] = useState([]);

    useEffect(() => {
        // Petición GET para obtener los tipos de documento
        axios.get('https://mi-api.com/tiposDocumento')
        .then(response => {
            setTiposDocumento(response.data);
        })
        .catch(error => {
            console.error('Hubo un error al hacer la petición GET:', error);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Petición POST para enviar la información del formulario
        const infoParaEnviar = {
        nombre,
        edad,
        fecha,
        tipoDocumento,
        numeroDocumento,
        correo,
        };

        axios.post('https://mi-api.com/usuarios', infoParaEnviar)
        .then(response => {
            console.log('Respuesta de la petición POST:', response.data);
        })
        .catch(error => {
            console.error('Hubo un error al hacer la petición POST:', error);
        });
    };

    const handleChange = (event) => {
        setTipoDocumento(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <br />
        <label>
            Edad:
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
        </label>
        <br />
        <label>
            Fecha de nacimiento:
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
        <br />
        <label>
            Tipo de Documento:
            <select name="tipoDocumento" value={tipoDocumento} onChange={handleChange}>
            <option value="">Seleccione...</option>
            {tiposDocumento.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))}
            </select>
        </label>
        <br />
        <label>
            Número de documento:
            <input type="text" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} />
        </label>
        <br />
        <label>
            Correo electrónico:
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </label>
        <br />
        <button type="submit">Enviar</button>
        </form>
    );
}

export default Formulario;
