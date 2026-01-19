import ProductDetailsClient from './productDetailsClient';
import { notFound } from 'next/navigation';
import { getProductByIdOrName } from '@/services/api/productApi';

export default async function ProductPage({ 
  params 
}: { 
  params: { productName: string } | Promise<{ productName: string }>
}) {
  // Handle case where params might be a Promise
  const resolvedParams = await Promise.resolve(params);
  const product = await getProductByIdOrName(resolvedParams.productName);
  
  if (!product) {
    notFound();
  }
  return <ProductDetailsClient initialProduct={product} />;
}