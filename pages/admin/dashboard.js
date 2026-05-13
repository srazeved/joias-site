import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  // 🔐 PROTEÇÃO
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
      }
    };

    checkUser();
  }, []);

  // 📦 PEDIDOS
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      setOrders(data || []);
    };

    fetchOrders();
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const totalOrders = orders.length;
  const avgOrder = totalOrders ? totalSales / totalOrders : 0;

  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", padding: 40, color: "#fff" }}>

      <h1 style={{ color: "#ba9d7d", letterSpacing: 3 }}>
        AURORA SILVER • DASHBOARD
      </h1>

      {/* LOGOUT */}
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/admin/login");
        }}
        style={{ marginTop: 20, padding: 10, background: "#ba9d7d", border: "none", cursor: "pointer" }}
      >
        LOGOUT
      </button>

      {/* STATS */}
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>

        <div style={card}>
          <h3>Total Vendas</h3>
          <p style={value}>€{totalSales.toFixed(2)}</p>
        </div>

        <div style={card}>
          <h3>Pedidos</h3>
          <p style={value}>{totalOrders}</p>
        </div>

        <div style={card}>
          <h3>Média</h3>
          <p style={value}>€{avgOrder.toFixed(2)}</p>
        </div>

      </div>

      {/* PEDIDOS */}
      <h2 style={{ marginTop: 50, color: "#ba9d7d" }}>ÚLTIMOS PEDIDOS</h2>

      {orders.slice(0, 5).map((order) => (
        <div key={order.id} style={orderCard}>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Total:</strong> €{order.total}</p>
          <p style={{ fontSize: 12, color: "#777" }}>
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      ))}

    </div>
  );
}

const card = {
  background: "#111",
  padding: 20,
  borderRadius: 10,
  flex: 1,
  border: "1px solid #222",
};

const value = {
  fontSize: 26,
  color: "#ba9d7d",
  marginTop: 10,
};

const orderCard = {
  background: "#111",
  padding: 15,
  marginTop: 15,
  borderRadius: 10,
  border: "1px solid #222",
};