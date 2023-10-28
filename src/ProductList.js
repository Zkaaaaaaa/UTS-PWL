import React from 'react';

function ProductList({ products, editProduct, deleteProduct }) {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span> - <span>${product.price}</span>
            <input type="number" placeholder="Jumlah" />
            <button onClick={() => editProduct(product.id)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
