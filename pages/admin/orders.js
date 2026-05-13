import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      setOrders(data || []);
    }

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: 40, background: "#0B0B0D", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ color: "#ba9d7d" }}>HISTÓRICO DE PEDIDOS</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #222",
            padding: 20,
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Total:</strong> €{order.total}</p>

          <div style={{ marginTop: 10 }}>
            <strong>Produtos:</strong>
            <ul>
              {order.products?.map((p, i) => (
                <li key={i}>
                  {p.name} — Qtd: {p.quantity} — €{p.price}
                </li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: 12, color: "#777" }}>
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}