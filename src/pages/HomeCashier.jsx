import {useNavigate } from 'react-router-dom';

function HomeCashier() {
    const Navigate = useNavigate();
    const handleCerrarClick = () => {
        
        Navigate('/LoginPages');
      };
    
      return (
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-gray-200 p-8 rounded-lg text-center mb-4">
          <h1 className="text-3xl font-bold mb-4">Bienvenido al Cajero</h1>
  
          {/* Contenido del componente */}
        </div>
  
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCerrarClick}
        >
          Cerrar Sesión
        </button>
      </div>
    );
  };
export default HomeCashier;
