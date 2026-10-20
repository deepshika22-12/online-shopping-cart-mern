import { useEffect, useState } from 'react'
import './App.css'

function Product({ productName, price }) {
  const [currentPrice, setCurrentPrice] = useState(price)

  useEffect(() => {
    console.log('Shopping Cart System Loaded')
  }, [])

  return (
    <div className="product-card">
      <h2>{productName}</h2>
      <p>Price: ₹{currentPrice}</p>

      <button
        onClick={() => setCurrentPrice(currentPrice - 200)}
        disabled={currentPrice < 200}
      >
        Apply ₹200 Discount
      </button>
    </div>
  )
}

export default function App() {
  return (
    <main className="app">
      <h1>Online Shopping Cart Management System</h1>
      <Product productName="Wireless Headphones" price={1500} />
    </main>
  )
}
