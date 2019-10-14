import React, {useState, useRef} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const EditProduct = ({product, history, setReloadProduct}) => {

    const precioPlatilloRef = useRef('');
    const nombrePlatilloRef = useRef('')
    const [ categoria, setCategoria] = useState('')
    const [ error, setError ] = useState(false)

    const getRadioValue = e => {
        setCategoria(e.target.value)
    }

    const editProduct = async e => {
        e.preventDefault();

        let categoriaPlatillo = (categoria === '') ? product.categoria : categoria;
        if(precioPlatilloRef.current.value === "" || nombrePlatilloRef.current.value === "" || categoriaPlatillo === ""){
            setError(true);
            return;
        }

        

        const editPlatillo = {
            precioPlatillo: precioPlatilloRef.current.value,
            nombrePlatillo: nombrePlatilloRef.current.value,
            categoria: categoriaPlatillo
        }
        const url = `http://localhost:4000/restaurant/${product.id}`;

        try{
            const result = await axios.put(url, editPlatillo)
            console.log(result)
            if(result.status === 200){
                Swal.fire(
                    'Producto Editado',
                    'El producto se edito de forma exitosa',
                    'success'
                )
                
            }else{
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Hubo un error, vuelve a intentarlo'
                })
            }
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo'
            })
        }
        setReloadProduct(true)
        history.push('/productos')
    }
    console.log(product)
    return ( 
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            {(error) ? <Error message="Todos los campos son obligatorios"/> : null}
            <form
                className="mt-5"
                onSubmit={editProduct}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        ref={nombrePlatilloRef}
                        defaultValue={product.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatilloRef}
                        defaultValue={product.precioPlatillo}
                        
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange={getRadioValue}
                        defaultChecked={(product.categoria === 'postre')}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange={getRadioValue}
                        defaultChecked={(product.categoria === 'bebida')}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        onChange={getRadioValue}
                        defaultChecked={(product.categoria === 'cortes')}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        onChange={getRadioValue}
                        defaultChecked={(product.categoria === 'ensalada')}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Guardar Producto" />
            </form>
        </div>
     );
}
 
export default withRouter(EditProduct);