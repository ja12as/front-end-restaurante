/**Pantalla: Registrar venta 
Nombre del producto 
Cantidad 
Precio 
Valor total 
Medio de pago 
Ingresar dinero dado 
Cambio  */

import '../style/venta.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import query  from '../api/axios.js';


function RegisterSalepage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [menu, setMenus] = useState([]);
    const [selectedMenus, setSelectedMenus] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [valorRecibido, setValorRecibido] = useState(0);
    const [valorCambio, setValorCambio] = useState(0);
    const [selectedMedioPago, setSelectedMedioPago] = useState('');
    const [mediosPago, setMediosPago] = useState([]);
    useEffect(() => {
        const fetchMediosPago = async () => {
            try {
            const response = await query.get('/medios-pagos', {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMediosPago(response.data);
            } catch (error) {
            console.error('Error al obtener los medios de pago:', error);
            }
        };
    
        fetchMediosPago();
        }, []);
    
        const handleMedioPagoChange = (event) => {
        setSelectedMedioPago(event.target.value);
        };
    
        const handleChangeValorRecibido = (event) => {
        const valor = parseFloat(event.target.value);
        setValorRecibido(valor);
        const cambio = valor - totalPrice;
        setValorCambio(cambio < 0 ? 0 : cambio);
        };
    
        const handleChange = (event) => {
        setSearchTerm(event.target.value);
        };
    
        useEffect(() => {
        const listarNombreMenu = async () => {
            try {
            const respuestaMenu = await query.get(`/menu/nombre/${searchTerm}`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMenus(respuestaMenu.data);
            } catch (error) {
            console.error('Error al obtener los menús:', error);
            }
        };
    
        if (searchTerm.trim() !== '') {
            listarNombreMenu();
        } else {
            setMenus([]);
        }
        }, [searchTerm]);
    
        const handleMenuSelect = (menu) => {
        const existingMenu = selectedMenus.find((selected) => selected.idMenu === menu.idMenu);
        if (existingMenu) {
            const updatedMenus = selectedMenus.map((selected) => {
            if (selected.idMenu === menu.idMenu) {
                return { ...selected, cantidad: selected.cantidad + 1 };
            }
            return selected;
            });
            setSelectedMenus(updatedMenus);
        } else {
            setSelectedMenus([...selectedMenus, { ...menu, cantidad: 1 }]);
        }
        const totalPriceUpdated = totalPrice + menu.precioMenu;
        setTotalPrice(totalPriceUpdated);
        };
    
        const handleRemoveMenu = (menu) => {
        const updatedMenus = selectedMenus.filter((selected) => selected.idMenu !== menu.idMenu);
        setSelectedMenus(updatedMenus);
        const totalPriceUpdated = totalPrice - menu.precioMenu * menu.cantidad;
        setTotalPrice(totalPriceUpdated);
        };
    
        const handleRemoveOneUnit = (menu) => {
        const existingMenu = selectedMenus.find((selected) => selected.idMenu === menu.idMenu);
        if (existingMenu) {
            if (existingMenu.cantidad === 1) {
            handleRemoveMenu(menu);
            } else {
            const updatedMenus = selectedMenus.map((selected) => {
                if (selected.idMenu === menu.idMenu) {
                return { ...selected, cantidad: selected.cantidad - 1 };
                }
                return selected;
            });
            setSelectedMenus(updatedMenus);
            const totalPriceUpdated = totalPrice - menu.precioMenu;
            setTotalPrice(totalPriceUpdated);
            }
        }
        };


    
        const handleAddOneUnit = (menu) => {
        const updatedMenus = selectedMenus.map((selected) => {
            if (selected.idMenu === menu.idMenu) {
            return { ...selected, cantidad: selected.cantidad + 1 };
            }
            return selected;
        });

        setSelectedMenus(updatedMenus);
        const totalPriceUpdated = totalPrice + menu.precioMenu;
        setTotalPrice(totalPriceUpdated);
        };

        const handleSave = async () => {
            if (selectedMenus.length === 0 || !selectedMedioPago || !valorRecibido) {
                alert("Por favor complete todos los campos obligatorios.");
                return;
            }
            
            try {
                // Construir el objeto de venta a enviar al servidor
                const ventaData = {
                numeroDocumento: localStorage.getItem("numeroDocumento"),
                idMedioPago: selectedMedioPago,
                cantidadVenta: selectedMenus.reduce((total, menu) => total + menu.cantidad, 0),
                precioTotal: totalPrice,
                valorRecibido: valorRecibido,
                valorCambio: valorCambio
                };
            
                // Realizar la solicitud al servidor para guardar la venta
                const responseVenta = await query.post('/venta/crear', ventaData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                });
            
                // Obtener el ID de la venta guardada
                const ventaId = responseVenta.data.idVenta;
            
                // Construir los objetos de detalles de venta a enviar al servidor
                const detallesVentaData = selectedMenus.map(menu => ({
                idVenta: ventaId,
                idMenu: menu.idMenu,
                cantidadMenu: menu.cantidad
                }));
            
                // Realizar la solicitud al servidor para guardar los detalles de la venta
                await Promise.all(detallesVentaData.map(async detalle => {
                await query.post('/venta-detalle', detalle, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                }));
            
                // Mostrar mensaje de éxito o realizar otras operaciones necesarias después de guardar la venta y los detalles de la venta
                alert("Venta y detalles de venta guardados exitosamente");
        
                setSearchTerm('');
                setMenus([]);
                setSelectedMenus([]);
                setTotalPrice(0);
                
                setValorRecibido(0);
                setValorCambio(0);
                setSelectedMedioPago('');
            } catch (error) {
                console.error('Error al guardar la venta y los detalles de la venta:', error);
                // Manejar el error adecuadamente, mostrar un mensaje al usuario, etc.
            }
            };
        
        
        return (
                <div className='container'>
                    <div className='subcontainer'>
                        <div className='title-filter'>
                            <div className='title'>
                                <h1>Registro de venta</h1>
                            </div>
                            <div className='filter'>
                                <div className='input-field'>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleChange}
                                        placeholder="Buscar Menú"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='registro-venta'>
                            <div className='vista-venta'>
                                <div className='datatable'>
                                    <div> {/* esto es el listado de la busqueda */}
                                        {menu.map((menuOption) => (
                                        <div key={menuOption.idMenu} onClick={() => handleMenuSelect(menuOption)}>
                                        {menuOption.nombreMenu} - Precio: {menuOption.precioMenu}$
                                        </div>
                                    ))}</div>
                                    <h2>Menús Seleccionados:</h2>
                                <table className='table table-striped  rounded'>
                                    <thead >
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>quitar</th>
                                            <th>Menos</th>
                                            <th>Mas</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            selectedMenus.map((selectedMenu) => (
                                                <tr key={selectedMenu.idMenu}>
                                                    <td>{selectedMenu.idMenu}</td>
                                                    <td>{selectedMenu.nombreMenu}</td>
                                                    <td>{selectedMenu.cantidad}</td>
                                                    <td>{selectedMenu.precioMenu * selectedMenu.cantidad}</td>
                                                    <td>{<button onClick={() => handleRemoveMenu(selectedMenu)}>⊗</button>}</td>
                                                    <td>{<button onClick={() => handleRemoveOneUnit(selectedMenu)}>-</button>}</td>
                                                    <td>{<button onClick={() => handleAddOneUnit(selectedMenu)}>+</button>}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                                </div>
                                <div className='input-4'>
                                    <div className='inputs'>
                                        <label>Valor Total</label>
                                        <input type='number' value={totalPrice} readOnly />
                                    </div>
                                    <div className='inputs'>
                                        <label>Forma de Pago</label>
                                        <select onChange={handleMedioPagoChange}>
                                        <option value="">Seleccionar Medio de Pago</option>
                                        {mediosPago.map(medioPago => (
                                            <option key={medioPago.idMedioPago} value={medioPago.idMedioPago}>{medioPago.descripcionTipoPago}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className='inputs'>
                                        <label>Valor Recibido:</label>
                                        <input
                                        id="valorRecibido"
                                        type="number"
                                        value={valorRecibido}
                                        onChange={handleChangeValorRecibido}
                                        />
                                    </div>
                                    <div className='inputs'>
                                        <label>Valor de Cambio:</label>
                                        <input
                                        id="valorCambio"
                                        type="number"
                                        value={valorCambio}
                                        readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='botones-ventas'>
                                <Link to='/home-admin'>
                                    <div className="botton-v">
                                        <button className=''>Salir</button>
                                    </div>
                                </Link>
                                <div className='botton-v'>
                                    <button onClick={handleSave}>Guardar</button>
                                </div>
                                <div className='input-total'>
                                    <label>Total</label>
                                    <input type='number' value={totalPrice} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            
};

export default RegisterSalepage
