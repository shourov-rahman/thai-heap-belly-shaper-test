import { useShoppingCartContext } from "../../context/useShoppingCartContext";
import { useState, useEffect } from "react";
import supabase from "../../utils/superbase";

type TProduct = {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  discounted_price: number;
  regular_price: number;
  product_images: TProductImage[];
};

type TProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  image_order: number;
};

const ProductSelection = () => {
  const [selectedProducts, setSelectedProducts] = useState<TProduct[]>([]);
  const { handleProductPrice } = useShoppingCartContext();
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .or("id.eq.1, slug.eq.double-layer-slimming-thai-hip-and-belly-shaper");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setSelectedProducts(data || []);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="md:max-w-5xl max-w-xl mx-auto p-4">
      <h3 className="text-2xl mb-4">আপনার পছন্দের অফারটি সিলেক্ট করুন</h3>
      <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3">
        <div className="flex w-full p-3 cursor-pointer rounded-lg border bg-white shadow-sm">
          <div className="relative">
            <input
              className="h-4 w-4"
              type="radio"
              onClick={() => handleProductPrice(680, 1)}
              id=" 1-piece"
              name="product-selection"
            />
            <label className="" htmlFor="1-piece"></label>
          </div>
          <div>
            {selectedProducts.map((product) => {
              return (
                <div>
                  {product.product_images
                    .filter((image) => image.image_order === 4)
                    .map((image) => (
                      <div key={image.id}>
                        <img
                          src={image.image_url}
                          alt={image.alt_text || ""}
                          className="w-24 h-24rounded-md object-cover object-center "
                        />
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
          <div>
            <div className=" text-gray-800 text-lg font-medium">
              ডাবল লেয়ার স্লিমিং থাই, হিপ ও বেলি শেপার ১ পিস
            </div>
            <div className="text-base text-gray-600 font-bold"> ৳ ৬৮০</div>
          </div>
        </div>
        <div className="flex w-full p-3 cursor-pointer rounded-lg border bg-white shadow-sm">
          <div className="relative">
            <input
              className="h-4 w-4"
              type="radio"
              name="product-selection"
              onClick={() => handleProductPrice(1180, 2)}
              id="2-piece"
            />
            <label className="" htmlFor="2-piece"></label>
          </div>
          <div>
            {selectedProducts.map((product) => {
              return (
                <div>
                  {product.product_images
                    .filter((image) => image.image_order === 4)
                    .map((image) => (
                      <div key={image.id}>
                        <img
                          src={image.image_url}
                          alt={image.alt_text || ""}
                          className="w-24 h-24rounded-md object-cover object-center "
                        />
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
          <div>
            <div className=" text-gray-800 text-lg font-medium">
              ডাবল লেয়ার স্লিমিং থাই, হিপ ও বেলি শেপার ২ পিস
            </div>
            <div className="text-base text-gray-600 font-bold">৳ ১১৮০</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
