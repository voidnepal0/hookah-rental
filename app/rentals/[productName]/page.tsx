import ProductDetailsClient from './productDetailsClient'

const ProductPage = async ({ params }: { params: Promise<{ productName: string }> }) => {
  const { productName } = await params;
  return <ProductDetailsClient productName={productName} />
}

export default ProductPage