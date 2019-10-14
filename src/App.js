import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Product from './components/Product';
import Header from './components/Header';
import axios from 'axios';

function App() {

  const [products, setProducts] = useState([])
  const [reloadProduct, setReloadProduct] = useState(true)
  
  useEffect(() =>{
    if(reloadProduct){
      const consultApi = async () => {
        const result = await axios.get('http://localhost:4000/restaurant')
        console.log(result.data);

        setProducts(result.data)
      }

      consultApi();

      setReloadProduct(false)
    }
  },[reloadProduct])

  return (

    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos" 
            render={() => (
              <Products
                setReloadProduct={setReloadProduct}
                products={products}
              />
            )} 
          />
          <Route exact path="/nuevo-producto"
            render={() => (
                <AddProduct
                setReloadProduct={setReloadProduct}
                />
            )}
          />
          <Route exact path="/productos/:id" component={Product} />
          <Route exact path="/productos/editar/:id"
            render={props => {
              let idProduct = parseInt(props.match.params.id)
              // console.log(idProduct)
              let productSelected = products.filter(product =>(idProduct ===product.id))
              // console.log(productSelected)
              return(
              <EditProduct
                setReloadProduct={setReloadProduct}
                product={productSelected[0]}
              />
            )}} 
          />
        </Switch>
      </main>
      

      <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
    </Router>
  );
}

export default App;
