import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import supabase from "../../utils/superbase";
import { useShoppingCartContext } from "../../context/useShoppingCartContext";
import convertToBanglaNumber from "../../utils/convertToBanglaNumber";

const OrderSchema = z.object({
  name: z
    .string()
    .refine(
      (val) => /^[\u0980-\u09FF\sa-zA-Z]+$/.test(val),
      "Name must contain only Bangla or English letters and spaces.",
    ),
  mobile: z
    .string()
    .refine(
      (val) => /^[\u09E6-\u09EF\d]+$/.test(val),
      "Mobile number must contain only Bangla or English numerals.",
    ),
  address: z
    .string()
    .refine(
      (val) => /^[\u0980-\u09FF\sa-zA-Z\d]+$/.test(val),
      "Address must contain only Bangla or English letters, numerals, and spaces.",
    ),
  productQuantity: z.number(),
  shippingCost: z.number(),
  total: z.number(),
});

type TOrderSchema = z.infer<typeof OrderSchema>;

const OrderForm = () => {
  const { total, shippingCost, productQuantity } = useShoppingCartContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add this line
    // reset,
  } = useForm<TOrderSchema>({
    resolver: zodResolver(OrderSchema),
  });

  // Update the values whenever the state changes in useShoppingCartContext
  setValue("productQuantity", productQuantity);
  setValue("shippingCost", shippingCost);
  setValue("total", total);

  const onSubmit = async (data: TOrderSchema) => {
    const { error } = await supabase
      .from("thai_heap_belly_shaper_orders")
      .insert([
        {
          name: data.name,
          mobile: data.mobile,
          address: data.address,
          quantity: data.productQuantity,
          shipping: data.shippingCost,
          total: data.total,
        },
      ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 m-8"
    >
      <h2 className="text-2xl"> আপনার নাম, ঠিকানা ও মোবাইল নাম্বার দিন </h2>
      <input
        {...register("name")}
        type="text"
        placeholder="আপনার নাম*"
        className="rounded px-4 py-2 border-2 mt-4"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <input
        {...register("mobile")}
        type="text"
        placeholder="মোবাইল নাম্বার*"
        className="rounded px-4 py-2 border-2 mt-4"
      />
      {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}

      <input
        {...register("address")}
        type="text"
        placeholder="সম্পূর্ণ ঠিকানা*"
        className="rounded px-4 py-2 border-2 mt-4"
      />
      {errors.address && (
        <p className="text-red-500">{errors.address.message}</p>
      )}
      <button
        type="submit"
        className="text-white  bg-[#007bff] hover:bg-blue-600 font-bold rounded-md text-lg px-4 py-3 mt-4 w-full"
      >
        অর্ডার কনফার্ম করুন ৳ {convertToBanglaNumber(total)}
      </button>
    </form>
  );
};

export default OrderForm;
