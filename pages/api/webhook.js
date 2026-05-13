import Stripe from "stripe";
import { Resend } from "resend";
import { supabase } from "../../lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Buffer manual (sem micro)
function buffer(readable) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    readable.on("data", (chunk) => {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    });

    readable.on("end", () => resolve(Buffer.concat(chunks)));
    readable.on("error", reject);
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    const rawBody = await buffer(req);

    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("🔥 EVENTO:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;

    try {
      // 🔥 Buscar produtos reais
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const products = lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total / 100,
      }));

      // 💾 SALVAR NO SUPABASE
      await supabase.from("orders").insert([
        {
          email: email,
          total: session.amount_total / 100,
          products: products,
          stripe_session_id: session.id,
        },
      ]);

      // 📧 EMAIL DE LUXO
      let rowsHTML = "";

      products.forEach((p) => {
        rowsHTML += `
          <tr>
            <td style="padding:8px 0;color:#fff;">${p.name}</td>
            <td style="padding:8px 0;color:#ba9d7d;text-align:center;">${p.quantity}</td>
            <td style="padding:8px 0;color:#ba9d7d;text-align:right;">€${p.price}</td>
          </tr>
        `;
      });

      await resend.emails.send({
        from: "Aurora Silver <onboarding@resend.dev>",
        to: email,
        subject: "Aurora Silver • Confirmação da sua encomenda",

        html: `
        <div style="background:#0B0B0D;padding:40px;font-family:Arial;color:#fff;">

          <h1 style="text-align:center;color:#ba9d7d;letter-spacing:6px;">
            AURORA SILVER
          </h1>

          <p style="text-align:center;color:#ccc;">
            Obrigado pela sua compra 💎
          </p>

          <table style="width:100%;margin-top:30px;">
            <thead>
              <tr style="color:#ba9d7d;">
                <th align="left">Produto</th>
                <th>Qtd</th>
                <th align="right">Preço</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>

          <hr style="margin:30px 0;border:1px solid #222;" />

          <p style="text-align:right;color:#ba9d7d;font-size:18px;">
            Total: €${session.amount_total / 100}
          </p>

          <p style="text-align:center;color:#777;margin-top:40px;">
            Aurora Silver • Timeless Elegance
          </p>

        </div>
        `,
      });

      console.log("📧 Email enviado + pedido guardado");
    } catch (error) {
      console.log("❌ Erro:", error);
    }
  }

  res.json({ received: true });
}