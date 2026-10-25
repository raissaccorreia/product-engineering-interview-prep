# Review: quantity controls

## Attempt

Elapsed time reported: approximately 40–50 minutes. The submitted implementation is preserved in [attempt.tsx](attempt.tsx), copied from `app/src/App.tsx` without changing its logic.

```tsx
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
```

## Feedback

Your core state update is correct. Both handlers use a functional state updater, map over the current array, return a new array, and create a new object only for the matching product. Matching by stable `id` is a good choice. This also handles rapid clicks without reading a stale `products` value.

Most of the behavior is implemented: the initial quantities are correct, the total is derived from the array, and the decrement logic prevents a quantity from going below zero. Two explicit UI requirements remain: disable the decrement button when quantity is zero, and extract a reusable product-row component that receives its product and event callbacks through props.

## Build and lint

`pnpm build` fails TypeScript checks with TS6133 for the unused `index` parameters in both `map` callbacks and the unused `e` parameters in both click handlers. Remove parameters the callbacks do not need.

`pnpm lint` completes with warnings for those same unused parameters and for the missing `key` on each rendered `<li>`. Use the product ID as the list key so React can track rows when their order or contents change.

## Edge cases, verification, and readability

The decrement handler protects the zero boundary, but the submitted message did not list manual checks, so I cannot mark the acceptance examples as verified by you. At review time, the open browser showed quantities 5, 0, and 3 with a total of 8. This confirms that the component renders and that state has changed from its initial values, but the exact click sequence was not provided.

`addProduct` changes a quantity rather than adding a product; `increaseProduct` would describe its behavior more clearly. `totalProducts` is also ambiguous because it stores the sum of quantities, not the number of product entries. `totalQuantity` would be more precise. The accumulator assignment inside `reduce` works, though `total + product.quantity` expresses the calculation more directly.

You did not include an English explanation with this submission, so there is no English phrasing to assess. The 40–50 minute estimate is useful: you completed most of the state behavior, while the time suggests that recalling JSX and checking every requirement were the slower parts. A compile and a short pass through the requirement list would have surfaced the remaining TypeScript and component requirements.

## Reference

The full implementation with a reusable row component, disabled decrement at zero, stable keys, immutable functional updates, and a derived total is in [reference.tsx](reference.tsx). It is separate from the original attempt.
