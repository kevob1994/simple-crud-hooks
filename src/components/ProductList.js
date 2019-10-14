import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductList = ({product,setReloadProduct}) => {

    const eliminarProducto= id => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un platillo eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            try {
            const url = `http://localhost:4000/restaurant/${id}`;
            const response = await axios.delete(url);
                if(response.status === 200){
                    if (result.value) {
                    Swal.fire(
                        'Eliminado!',
                        'El platillo ha sido eliminado de forma exitosa',
                        'success'
                    )
                    }
                    setReloadProduct(true)
                }
            } catch (error) {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Hubo un error, vuelve a intentarlo'
                  })
            }
            
          })
    }
    return (
        <li  data-categoria={product.categoria} className="list-group-item 
            d-flex justify-content-between align-items-center">
            <p>
                {product.nombrePlatillo}{'   '}
                <span className="font-weight-bold">
                    ${product.precioPlatillo}
                </span>
            </p>

            <div>
                <Link
                    to={`/productos/editar/${product.id}`}
                    className="btn btn-success mr-2"
                >Editar</Link>

                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarProducto(product.id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
}
 
export default ProductList;