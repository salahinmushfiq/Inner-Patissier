import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";

const extractCursor = (url) => {
  if (!url) return null;
  const parsed = new URL(url);
  return parsed.searchParams.get("cursor");
};

const fetchProducts = async ({ pageParam = null, queryKey }) => {
  const [_key, filters] = queryKey;

  const params = new URLSearchParams();

  if (pageParam) params.append("cursor", pageParam);
  if (filters?.category) params.append("category", filters.category);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.sort) params.append("sort", filters.sort);

  const res = await api.get(`/products/?${params.toString()}`);
  return res.data;
};

const Products = ({ filters }) => {
  const observerRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => extractCursor(lastPage.next),
  });

  // 🔥 Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      
      {/* Products */}
      {data?.pages.map((page) =>
        page.results.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      )}

      {/* Skeleton */}
      {(isLoading || isFetchingNextPage) &&
        Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}

      {/* Observer */}
      <div ref={observerRef} className="h-10" />
    </section>
  );
};

export default Products;