"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "@/store/slices/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";

export default function Home() {
  const { products, productTotal, loading } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts({ limit: 18, skip: 0 }));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = Math.ceil(document.documentElement.scrollHeight);
      const innerHeight = Math.ceil(window.innerHeight);
      const scrollY = Math.ceil(window.scrollY);

      if (
        innerHeight + scrollY >= scrollHeight * 0.9 &&
        products.length < productTotal &&
        !loading
      ) {
        dispatch(
          fetchProducts({
            limit: 20,
            skip: products.length,
          })
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, loading, products.length, productTotal]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 scroll-smooth">
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[66rem]">
        {products.map((item, index) => (
          <ProductCard
            key={index}
            {...item}
          />
        ))}
      </div>
      {loading ? (
        <div className="my-5">
          <Loading />
        </div>
      ) : null}
    </main>
  );
}
