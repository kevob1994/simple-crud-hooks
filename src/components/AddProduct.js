import React, {useState} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';


const AddProduct = ({history, setReloadProduct}) => {

    const [ nombrePlatillo, setNombrePlatillo] = useState('')
    const [ precioPlatillo, setPrecioPlatillo] = useState('')
    const [ categoria, setCategoria] = useState('')
    const [ error, setError ] = useState(false)

    const getRadioValue = e => {
        setCategoria(e.target.value)
    }

    const AddNewProduct = async e => {
        e.preventDefault();

        if(nombrePlatillo === "" || precioPlatillo === "" || categoria === ""){
            setError(true)
            return;
        }
        setError(false);

        try{
            const result = await axios.post('http://localhost:4000/restaurant', {
                nombrePlatillo,
                precioPlatillo,
                categoria
            });

            console.log(result)

            if(result.status === 201){
                Swal.fire(
                    'Producto creado',
                    'El producto se creo de forma exitosa',
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
    return ( 
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            {(error) ? <Error message="Todos los campos son obligatorios"/> : null}
            <form
                className="mt-5"
                onSubmit={AddNewProduct}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        onChange={e=> setNombrePlatillo(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e=> setPrecioPlatillo(e.target.value)}
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
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
     );
}
 
export default withRouter(AddProduct);