import React from 'react'

function Ejemplo() {
    return (
        <div>
        {/*  ejemplo de la tipografia*/}
            <div>
            <h1 className='font-serif text-3×1'>Aileron Heavy- Titulo</h1>
            <h2 className='font-sans text-xl'>Roboto Condensed - Subtitulo</h2>
            <p className='font-serif text-base'>Aileron Regular- Texto</p>
            </div>
        
            {/* ejemplo de la img*/}
            <div>
                <img
                src="dasboard.png"
                alt='descripcion de la img'
                className='img rounded-img'
                />
            </div>
            </div>
        )
    }
    


export default Ejemplo
