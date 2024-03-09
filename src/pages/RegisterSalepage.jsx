/**Pantalla: Registrar venta 
Nombre del producto 
Cantidad 
Precio 
Valor total 
Medio de pago 
Ingresar dinero dado 
Cambio  */
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';

function RegisterSalepage() {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    return (
        <div>
            <div>
                <div>
                    Registrar venta
                </div>
                <div>
                    <div>
                    <InputText
                                onInput={(e) =>
                                    setFilters({
                                        global: { value: e.target.value, matchMode: 'contains' },
                                    })}
                                placeholder='Buscar Menu'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterSalepage
