import { CheckIcon } from "@heroicons/react/24/solid";

const OrderConfirmation = () => {
  return (
    <div>
      <section className="mb-6 sm:mb-8">
        <div className="bg-blue-100 px-6 py-12">
          <div className="flex justify-center items-center mb-8">
            <CheckIcon className="h-28 w-28 text-green-900" />
          </div>
          <div className="container mx-auto flex flex-col justify-center items-center text-center">
            <h1 className="sm:text-4xl text-3xl font-bold mb-4">
              আপনার অর্ডার কনফার্ম করার জন্য ধন্যবাদ
            </h1>
          </div>
          <ul className="text-2xl text-center py-6 px-4 flex flex-col gap-y-4">
            <li>
              ১। অর্ডার করার পরে আমাদের কল সেন্টার থেকে ফোন করে পন্যের কালার ও
              সাইজ কনফার্ম করা হবে।
            </li>
            <li>
              ২। ঢাকা সিটিতে ১-২ দিনের মধ্যে পন্য পাবেন, ঢাকা সিটির বাইরে ২-৩
              দিনের মধ্যে পন্য পাবেন।
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default OrderConfirmation;
