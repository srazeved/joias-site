// pages/api/checkout.js

import { stripe } from "../../lib/stripe";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido",
    });
  }

  try {

    const { cart } = req.body;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "eur",

        product_data: {
          name: item.name,
        },

        unit_amount: Math.round(
          Number(item.price) * 100
        ),
      },

      quantity: item.quantity,
    }));

    const session =
      await stripe.checkout.sessions.create({

        payment_method_types: ["card"],

        line_items,

        mode: "payment",

        success_url:
          "http://localhost:3000/success",

        cancel_url:
          "http://localhost:3000/cart",
      });

    res.status(200).json({
      url: session.url,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Erro Stripe",
    });
  }
}