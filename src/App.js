import React, { useState } from 'react';
import ProductList from './ProductList';

function App() {
  const initialProduct = { id: null, name: '', price: 0 };
  const [products, setProducts] = useState([
    { id: 1, name: 'Produk 1', price: 10 },
    { id: 2, name: 'Produk 2', price: 20 },
    { id: 3, name: 'Produk 3', price: 30 },
  ]);
  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]); // State untuk keranjang belanja
  const [totalPrice, setTotalPrice] = useState(0); // State untuk total harga belanjaan

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  const saveProduct = () => {
    if (!product.name || !product.price) {
      setErrors({ message: 'Nama dan harga produk harus diisi.' });
      return;
    }

    if (product.id) {
      const updatedProducts = products.map((p) =>
        p.id === product.id ? product : p
      );
      setProducts(updatedProducts);
    } else {
      const newId = products.length + 1;
      setProducts([...products, { ...product, id: newId }]);
    }

    setProduct(initialProduct);
    setErrors({});
  };

  const editProduct = (id) => {
    const selectedProduct = products.find((p) => p.id === id);
    setProduct(selectedProduct);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
  };

  const addToCart = () => {
    if (!product.name || product.price === 0 || quantity === 0) {
      setErrors({ message: 'Nama, harga, dan jumlah produk harus diisi.' });
      return;
    }

    const productInCart = {
      ...product,
      quantity,
      total: product.price * quantity,
    };

    setCart([...cart, productInCart]);
    setTotalPrice(totalPrice + productInCart.total);

    setProduct(initialProduct);
    setQuantity(1);
    setErrors({});
  };

  return (
    <div>
      <h1>Daftar Produk</h1>
      <ProductList
        products={products}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
      <h2>Tambah/Update Produk</h2>
      <form>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nama Produk"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Harga Produk"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="button" onClick={saveProduct}>
            Simpan
          </button>
        </div>
      </form>
      {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}

      <h2>Jumlah Produk yang Akan Dibeli</h2>
      <div>
        <input
          type="number"
          name="quantity"
          placeholder="Jumlah"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <p>Jumlah: {quantity}</p>
      <button type="button" onClick={addToCart}>
        Tambahkan ke Keranjang Belanja
      </button>

      <h2>Keranjang Belanja</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - Jumlah: {item.quantity} - Total: ${item.total}
          </li>
        ))}
      </ul>
      <p>Total Harga Belanjaan: ${totalPrice}</p>
    </div>
  );
}

export default App;
