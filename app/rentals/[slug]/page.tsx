import ProductDetailsClient from "./productDetailsClient";
import { notFound } from "next/navigation";
import { getProductById } from "@/services/api/productApi";

export default async function ProductPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // Handle case where params might be a Promise
  const resolvedParams = await Promise.resolve(params);
  const product = await getProductById(resolvedParams.slug);

  console.log("PRODUCT::::", product);

  if (!product) {
    notFound();
  }
  return <ProductDetailsClient initialProduct={product} />;
}
