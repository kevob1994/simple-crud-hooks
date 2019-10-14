import React, {Fragment} from 'react'
import ProductList from './ProductList';

const Products = ({products, setReloadProduct}) => {
    let p = products
    console.log(p, "product")
    return ( 
        <Fragment>
            <h1 className="text-center">Detalle del producto</h1>
            <ul className="list-group mt-5">
                {products.map(product =>
                    <ProductList
                        setReloadProduct={setReloadProduct}
                        key={product.id}
                        product={product}
                    />
                )}
            </ul>

        </Fragment>
        
     );
}
 
export default Products;