import React from 'react'

function nuevo() {
  return (
    <div>
        <h1 style={{
        fontFamily: 'var(--font-title)',
        fontSize: 'var(--font-size-title)',
        color: 'black'
      }}>Título</h1>
      <h2 style={{
        fontFamily: 'var(--font-subtitle)',
        fontSize: 'var(--font-size-subtitle)',
        color: 'black'
      }}>Subtítulo</h2>
      <p style={{
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--font-size-text)',
        color: 'black'
      }}>Texto de ejemplo</p>
    </div>

    
/*
      <form onSubmit={handleSubmit}>
          <div>
          <label>
              Nombre:
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <label>
              Apellido:
              <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </label>
          </div>
          <div>
          <label>
              Edad:
              <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
          </label>
          <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          </div>
          <div>
          <button type="submit">Guardar</button>
          <button type="button">Salir</button>
          </div>
      </form>
  </div>
</div>*/
  )
}

export default nuevo
