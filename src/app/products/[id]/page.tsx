// app/products/[id]/page.tsx - FIXED VERSION
import { notFound } from "next/navigation";
import { fetchProductById, fetchProducts } from "@/utils/api/api";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import RecommendedProducts from "./RecommendedProducts";
import { Product } from "@/types/product";

// ✅ Generate static paths
export async function generateStaticParams() {
  try {
    console.log("🔄 Generating static paths...");

    let products: Product[] = [];
    try {
      const productsData: any = await fetchProducts();
      console.log("📦 Raw products data type:", typeof productsData);

      // Handle different response formats
      if (Array.isArray(productsData)) {
        products = productsData;
      } else if (productsData && typeof productsData === "object") {
        // Type assertion with proper checking
        const response = productsData as Record<string, any>;

        if (Array.isArray(response.data)) {
          products = response.data;
        } else if (Array.isArray(response.products)) {
          products = response.products;
        } else if (Array.isArray(response.items)) {
          products = response.items;
        } else if (Array.isArray(response.result)) {
          products = response.result;
        } else {
          console.log("🔍 No array found in response, checking all keys:");
          Object.keys(response).forEach((key) => {
            if (Array.isArray(response[key])) {
              console.log(
                `🔍 Found array in key '${key}' with ${response[key].length} items`
              );
              products = response[key];
            }
          });
        }
      }
    } catch (error) {
      console.error("❌ Error fetching products for static paths:", error);
      return [];
    }

    console.log("📦 Total products for static generation:", products.length);

    const params = products.slice(0, 10).map((product: Product) => ({
      id: String(product.id),
    }));

    console.log("✅ Generated params:", params.length);
    return params;
  } catch (error) {
    console.error("❌ Error generating static params:", error);
    return [];
  }
}

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  try {
    const { id } = await params;

    if (!id || id === "undefined" || id === "null") {
      console.error("❌ Invalid ID:", id);
      notFound();
    }

    let product: Product | null = null;
    try {
      product = await fetchProductById(id);
    } catch (fetchError) {
      console.error("❌ Error fetching product:", fetchError);
    }

    if (!product) {
      console.error("❌ Product not found for ID:", id);
      notFound();
    }

    let allProducts: Product[] = [];

    try {
      const allProductsResponse: any = await fetchProducts();

      if (Array.isArray(allProductsResponse)) {
        allProducts = allProductsResponse;
        console.log("✅ Products received as array");
      } else if (
        allProductsResponse &&
        typeof allProductsResponse === "object"
      ) {
        const response = allProductsResponse as Record<string, any>;
        console.log("🔍 Response keys:", Object.keys(response));

        // Check common response patterns
        const possibleArrayKeys = [
          "data",
          "products",
          "items",
          "result",
          "records",
        ];

        for (const key of possibleArrayKeys) {
          if (Array.isArray(response[key])) {
            console.log(`✅ Found products in '${key}' key`);
            allProducts = response[key];
            break;
          }
        }

        // If still not found, check all keys
        if (allProducts.length === 0) {
          Object.keys(response).forEach((key) => {
            if (Array.isArray(response[key])) {
              console.log(`🔍 Found array in '${key}' key`);
              allProducts = response[key];
            }
          });
        }
      }
    } catch (productsError) {
      console.error("❌ Error fetching all products:", productsError);
      allProducts = [product]; // Use current product as fallback
    }

    console.log("📦 All products count:", allProducts.length);

    // Find related products
    const relatedProducts = allProducts
      .filter((p: Product) => {
        const sameCategory = p.category === product?.category;
        const notSameProduct = String(p.id) !== String(product?.id);
        return sameCategory && notSameProduct;
      })
      .slice(0, 5);

    return (
      <div className="min-h-screen bg-gray-50 pt-18">
        <div className="">
          <ProductInfo product={product} />
          <ProductReviews reviews={product.reviews || []} />
          <RecommendedProducts
            currentId={id}
            category={product.category}
            relatedProducts={relatedProducts}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ Error in ProductDetail page:", error);

    if (error instanceof Error) {
      console.error("❌ Error message:", error.message);
    }

    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    console.log("📌 Generating metadata for product ID:", id);

    let product: Product | null = null;
    try {
      product = await fetchProductById(id);
    } catch (error) {
      console.error("❌ Error fetching product for metadata:", error);
      product = null;
    }

    if (!product) {
      return {
        title: "Product Details",
        description: "View detailed information about the product",
      };
    }

    return {
      title: `${product.name} - Product Details`,
      description:
        product.description ||
        `View details of ${product.name}. Price: Rs. ${product.price}`,
    };
  } catch (error) {
    console.error("❌ Error generating metadata:", error);
    return {
      title: "Product Details",
      description: "View detailed information about the product",
    };
  }
}
