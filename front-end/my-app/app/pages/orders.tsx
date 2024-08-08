"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function Orders() {
  const [formData, setFormData] = useState({
    userId: '',
    productId: '',
    quantity: '',
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/orders', {
        userId: formData.userId,
        productId: formData.productId,
        quantity: formData.quantity,
      });

      console.log('Commande créée:', response.data);

    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      alert('Une erreur est survenue lors de la création de la commande.');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center">
            Passer une commande
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="userId" className="block text-sm font-medium text-gray-900 dark:text-white">
                Identifiant Utilisateur
              </label>
              <input
                type="text"
                name="userId"
                id="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary-600 focus:border-primary-600"
                placeholder="Entrez l'ID de l'utilisateur"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="productId" className="block text-sm font-medium text-gray-900 dark:text-white">
                Produit
              </label>
              <select
                name="productId"
                id="productId"
                value={formData.productId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary-600 focus:border-primary-600"
                required
              >
                <option value="" disabled>
                  Sélectionnez un produit
                </option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.price}€
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-900 dark:text-white">
                Quantité
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary-600 focus:border-primary-600"
                placeholder="Entrez la quantité"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300"
              style={{ backgroundColor: 'rebeccapurple' }}
            >
              Passer la commande
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
