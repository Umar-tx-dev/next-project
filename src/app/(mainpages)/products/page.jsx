"use client";
import React from "react";
import Image from "next/image";
import useApi from "@/utils/useApi";

export default function Products() {
  const { data, loading, error } = useApi("/products");

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((product) => (
          <div 
            key={product.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <div className="relative w-full h-64">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                priority
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description.substring(0, 100)}...</p>
              <p className="text-lg font-semibold text-gray-800">Price: ${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-500">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            </div>
            <div className="bg-gray-100 p-4 text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
