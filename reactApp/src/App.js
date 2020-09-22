import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    products: [],
    product: {

    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(response => this.setState({ products: response.data }))
      .catch(err => console.error(err))
  }

  getProducts = _ => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(response => this.setState({ products: response.data }))
      .catch(err => console.error(err))
  }

  addProduct = _ => {
    const { product } = this.state
    fetch(`http://localhost:5000/products/add?name=${product.name}&price=${product.price}`)
      .then(response => response.json())
      .then(this.getProducts)
      .catch(err => console.error(err))
  }

  deleteProduct = id => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => {

        this.getAllProducts()
      })
      .then(res => {
        const allProducts = res.data;
        this.setState({ allProducts });
      })
      .catch(err => {
        console.error(err);
      });
  };

  renderProduct = ({ id, name, price }) =>
    <div key={id}>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        <td>
          {name}
        </td>
        <td>
          $ {price}
          <button className="delete" onClick={() => this.deleteProduct(id)}>
            Delete
          </button>
        </td>
      </table>

    </div>

  render() {
    const { products, product } = this.state;
    return (
      <div className="App">

        <div className="add">

          <h1 className="addh1">Add products :</h1>
          <input placeholder="Product Name"
            value={product.name}
            onChange={e => this.setState({ product: { ...product, name: e.target.value } })} />
          <input placeholder="Price"
            value={product.price}
            onChange={e => this.setState({ product: { ...product, price: e.target.value } })}
          />
          <button className="btn" onClick={this.addProduct}>Add Product</button>
        </div>

        <hr></hr>

        <h1 className="apptitle">Products selected :</h1>
        <p>{products.map(this.renderProduct)}</p>
      </div>


    )
  }
}

export default App;
