"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>('http://localhost:6000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href="#" className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img 
                  src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" 
                  alt={product.description} 
                  className="h-full w-full object-cover object-center group-hover:opacity-75" 
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
