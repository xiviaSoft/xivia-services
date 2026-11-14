import { notFound } from "next/navigation";
import Navbar from "@/Component/layouts/Navbar";
import Footer from "@/Component/common/Footer";
import ProductDetail from "@/Component/products/ProductDetail";
import { getAllProductSlugs, getProduct } from "@/data/products";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product · XiviaSoft" };
  return {
    title: `${product.name} · XiviaSoft`,
    description: product.summary,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
