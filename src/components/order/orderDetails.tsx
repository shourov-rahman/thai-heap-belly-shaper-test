import { useState, useEffect } from "react";
import { useShoppingCartContext } from "../../context/useShoppingCartContext";
import supabase from "../../utils/superbase";
import convertToBanglaNumber from "../../utils/convertToBanglaNumber";
import OrderForm from "./orderForm";
import Shipping from "./shipping";

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

const OrderDetails = () => {
  const [selectedProducts, setSelectedProducts] = useState<TProduct[]>([]);
  const { productPrice, productQuantity, total } = useShoppingCartContext();

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
    <div className="bg-white p-4">
      <div className="md:max-w-5xl max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="order-2">
            <OrderForm />
          </div>

          <div className="bg-gray-50 p-6 rounded-md">
            <ul className="">
              {selectedProducts.map((product) => {
                return (
                  <div key={product.id} className="flex">
                    <div>
                      {product.product_images
                        .filter((image) => image.image_order === 4)
                        .map((image) => (
                          <div key={image.id}>
                            <img
                              src={image.image_url}
                              alt={image.alt_text || ""}
                              className="rounded-md object-cover object-center "
                            />
                          </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-[2fr,1fr,1fr] gap-x-3">
                      <div className="text-base place-self-center font-medium text-gray-700 ">
                        {product.name}
                      </div>
                      <div className="text-base  place-self-center font-medium text-gray-900">
                        ×{convertToBanglaNumber(productQuantity)}
                      </div>
                      <div className="text-base justify-self-end place-self-center font-bold text-gray-900">
                        ৳ {convertToBanglaNumber(productPrice)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </ul>
            <ul className="text-gray-800 mt-6 space-y-3">
              <li className="flex flex-wrap gap-4 text-base">
                SubTotal
                <span className="ml-auto text-base font-bold">
                  ৳ {convertToBanglaNumber(productPrice)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-base">
                Shipping
                <span className="ml-auto">
                  <Shipping />
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-base font-bold border-t-2 pt-4">
                Total
                <span className="ml-auto text-base">
                  ৳ {convertToBanglaNumber(total)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
