import { useState } from 'react'

type Product = {
  id: string
  name: string
  quantity: number
}

type ProductRowProps = {
  product: Product
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
}

const initialProducts: Product[] = [
  { id: 'p1', name: 'Almonds', quantity: 4 },
  { id: 'p2', name: 'Oat milk', quantity: 0 },
  { id: 'p3', name: 'Coffee beans', quantity: 2 },
]

function ProductRow({ product, onIncrease, onDecrease }: ProductRowProps) {
  return (
    <li>
      <span>{product.name}</span>
      <button
        type="button"
        aria-label={`Decrease ${product.name}`}
        disabled={product.quantity === 0}
        onClick={() => onDecrease(product.id)}
      >
        -
      </button>
      <span>{product.quantity}</span>
      <button
        type="button"
        aria-label={`Increase ${product.name}`}
        onClick={() => onIncrease(product.id)}
      >
        +
      </button>
    </li>
  )
}

function ReferenceApp() {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  function increaseProduct(id: string) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    )
  }

  function decreaseProduct(id: string) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product,
      ),
    )
  }

  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  return (
    <main>
      <h1>Product list</h1>
      <p>Total quantity: {totalQuantity}</p>
      <ul>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onIncrease={increaseProduct}
            onDecrease={decreaseProduct}
          />
        ))}
      </ul>
    </main>
  )
}

export default ReferenceApp
