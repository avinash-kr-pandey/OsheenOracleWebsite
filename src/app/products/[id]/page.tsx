// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import { fetchProductById, fetchProducts, Product } from "@/utils/api/api";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import RecommendedProducts from "./RecommendedProducts";

// ✅ Generate static paths
export async function generateStaticParams() {
  try {
    console.log("🔄 Generating static params...");
    const products = await fetchProducts();
    console.log("📦 Total products for static generation:", products.length);

    const params = products.slice(0, 10).map((product: Product) => ({
      id: product.id.toString(),
    }));

    console.log("✅ Generated params:", params);
    return params;
  } catch (error) {
    console.error("❌ Error generating static params:", error);
    return [];
  }
}

// ✅ Next.js 15 में params एक Promise है
interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  try {
    // ✅ Promise को resolve करें
    const { id } = await params;

    console.log("📌 ProductDetail page rendering...");
    console.log("📌 Product ID from params:", id);

    if (!id || id === "undefined" || id === "null") {
      console.error("❌ Invalid ID:", id);
      notFound();
    }

    const productId = parseInt(id);

    if (isNaN(productId)) {
      console.error("❌ ID is not a number:", id);
      notFound();
    }

    console.log("🔄 Fetching product with ID:", productId);

    // ✅ API से single product fetch करें
    const product = await fetchProductById(productId);
    console.log("✅ Product fetched:", product ? "Yes" : "No");

    if (!product) {
      console.error("❌ Product not found for ID:", productId);
      notFound();
    }

    console.log("🔄 Fetching all products for recommendations...");
    const allProducts = await fetchProducts();

    // ✅ Filter related products (same category)
    const relatedProducts = allProducts
      .filter(
        (p: Product) => p.category === product.category && p.id !== product.id
      )
      .slice(0, 5);

    console.log("✅ Related products found:", relatedProducts.length);

    return (
      <div className="min-h-screen bg-gray-50 pt-18">
        <div className="">
          <ProductInfo product={product} />
          <ProductReviews
            productId={productId}
            reviews={product.reviews || []}
          />
          <RecommendedProducts
            currentId={productId}
            category={product.category}
            relatedProducts={relatedProducts}
          />
        </div>
      </div>
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("❌ Error in ProductDetail page:", err);
    console.error("❌ Error message:", err.message);
    console.error("❌ Error stack:", err.stack);
    notFound();
  }
}

// ✅ Add metadata for better SEO
export const metadata = {
  title: "Product Details",
  description: "View detailed information about the product",
};
