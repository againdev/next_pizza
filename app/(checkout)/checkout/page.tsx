"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import {
  CheckoutAdressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from "@/shared/components";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success("Заказ успешно оформлен! Переход на оплату...", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      toast.error("Не удалось создать заказ"),
        {
          icon: "❌",
        };
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newValue = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newValue);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-80">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutAdressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>

            {/* Правая чать */}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
