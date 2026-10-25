import './App.css'
import React from "react";

type Product = {
   id: string;
   name: string;
   quantity: number;
}

function App() {
  const initialProducts = [
     {id: "p1", name: "Almonds", quantity: 4},
     {id: "p2", name: "Oat milk", quantity: 0},
     {id: "p3", name: "Coffee beans", quantity: 2},
  ];
  
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  
  function addProduct(id: string) {
     setProducts((current) => current.map((value, index) => value.id === id ? {id: value.id, name: value.name, quantity: value.quantity + 1} : value));
  };
  function subtractProduct(id: string){
     setProducts((current) => current.map((value, index) => value.id === id && value.quantity > 0 ? {id: value.id, name: value.name, quantity: value.quantity - 1} : value));
  };
  
  const totalProducts = products.reduce((acc, curr) => acc += curr.quantity, 0);
  
  return (
    <main>
      <h1>Product List</h1>
      <h2>Product Amount: {totalProducts}</h2>
      <ul>
      {products.map((product: Product) => {
         return (
            <li>
               <button onClick={(e) => addProduct(product.id)}>+</button><p>{product.quantity}</p><button onClick={(e) => subtractProduct(product.id)}>-</button>
               <p>{product.name}</p>
            </li>
         );
      })}
      </ul>
    </main>
  )
}

export default App
