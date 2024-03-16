import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const SimpleForm = () => {

  const captcha = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    rol: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar nombre 
    if (name === 'name') {
      if (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
        setErrorMessages({ ...errorMessages, [name]: '' });
      } else {
        setErrorMessages({ ...errorMessages, [name]: 'El nombre contiene caracteres incorrectos.' });
      }
    }
   // Validar apellido
    if (name === 'lastName') {
      if (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
        setErrorMessages({ ...errorMessages, [name]: '' });
      } else {
        setErrorMessages({ ...errorMessages, [name]: 'El apellido contiene caracteres incorrectos.' });
      }
    }
    // Validar correo electrónico
    if (name === 'email') {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrorMessages({ ...errorMessages, email: '' });
      } else {
        setErrorMessages({ ...errorMessages, email: 'Por favor ingrese un correo válido.' });
      }
    }
    // Validar contraseña
    if (name === 'password') {
      if (/(?=.[a-z])(?=.[A-Z])/.test(value)) {
        setErrorMessages({ ...errorMessages, password: '' });
      } else {
        setErrorMessages({ ...errorMessages, password: 'La contraseña debe tener al menos una mayúscula y una minúscula.' });
      }
    }
    // Validar longitud y formato del número de teléfono
    if (name === 'phone') {
      if (/^3\d{9}$/.test(value)) {
        setErrorMessages({ ...errorMessages, phone: '' });
      } else {
        setErrorMessages({ ...errorMessages, phone: 'El número de teléfono debe empezar en 3 y contener 10 dígitos.' });
      }
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (!form.checkValidity()) {
      alert('Debes completar todos los campos requeridos');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/login/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.json();

      if (responseBody.idUsers === null) {
        // Registro exitoso
        console.log('Datos enviados con éxito al backend.');
        alert('¡Tu registro fue exitoso! Ya puedes iniciar sesión');
        window.location.reload(); 

      } else {
        console.error('Error inesperado en la respuesta del backend:', responseBody);
        alert('¡Error! Prueba con otro correo!');
      }
   
  } catch (error) {
    console.error('Error de red:', error);
  }
  };

  return (
    <form onSubmit={handleSubmit} className={register ${Object.values(errorMessages).some(error => error) ? 'was-validated' : ''}} id="register" noValidate>
      <h2>Registrarse</h2>

      <div className="form-group">
        <label htmlFor="name"></label>
        <input type="text" name="name" required value={formData.name} placeholder="Nombres" onChange={handleChange} />
        {errorMessages.name && <div className='error-message'>{errorMessages.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName"></label>
        <input type="text" name="lastName" required value={formData.lastName} placeholder="Apellidos" onChange={handleChange} />
        {errorMessages.lastName && <div className='error-message'>{errorMessages.lastName}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email"></label>
        <input type="email" name="email" required value={formData.email} placeholder="Correo Electrónico" onChange={handleChange} />
        {errorMessages.email && <div className='error-message'>{errorMessages.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="password"></label>
        <input type="password" name="password" required value={formData.password} placeholder="Contraseña" onChange={handleChange} />
        {errorMessages.password && <div className='error-message'>{errorMessages.password}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="phone"></label>
        <input type="tel" name="phone" required value={formData.phone} placeholder="Celular" onChange={handleChange} />
        {errorMessages.phone && <div className='error-message'>{errorMessages.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="address"></label>
        <input type="text" name="address" required value={formData.address} placeholder="Dirección" onChange={handleChange} />
        {errorMessages.address && <div className='error-message'>{errorMessages.address}</div>}
      </div>

      <>
        <ReCAPTCHA
          ref={captcha}
          sitekey="6Ld3NnopAAAAAK93yWQ0GWJS1O_x-XgoYKg8rMNp"
        />
      </>

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default SimpleForm;