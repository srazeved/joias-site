import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/supabase";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
    setLoading(false);
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>SHOP</h1>
        <p style={styles.subtitle}>Coleções selecionadas</p>
      </div>

      {/* LOADING */}
      {loading && (
        <p style={styles.loading}>A carregar produtos...</p>
      )}

      {/* GRID */}
      <div style={styles.grid}>

        {!loading && products.length === 0 && (
          <p style={styles.empty}>
            Nenhum produto encontrado.
          </p>
        )}

        {products.map((p) => {

          let images = [];

          try {
            images =
              typeof p.images === "string"
                ? JSON.parse(p.images)
                : p.images;
          } catch {
            images = [];
          }

          return (
            <Link key={p.id} href={`/product/${p.id}`}>
              <div style={styles.card}>

                {/* FRAME */}
                <div style={styles.frame}>
                  <Image
                    src={images?.[0] || "/images/placeholder.jpg"}
                    width={300}
                    height={300}
                    alt={p.name}
                    style={styles.image}
                  />
                </div>

                {/* TEXTO FORA DO FRAME */}
                <p style={styles.name}>
                  {p.name?.toUpperCase()}
                </p>

                <p style={styles.price}>
                  € {p.price}
                </p>

              </div>
            </Link>
          );
        })}

      </div>

    </div>
  );
}

/* 💎 STYLES COMPLETOS */
const styles = {

  page: {
    backgroundColor: "#0B0B0D",
    minHeight: "100vh",
    padding: "80px 40px",
    color: "#ba9d7d",
    fontFamily: "'Playfair Display', serif",
  },

  header: {
    textAlign: "center",
    marginBottom: 40,
  },

  title: {
    fontSize: 42,
    letterSpacing: 4,
  },

  subtitle: {
    opacity: 0.7,
    marginTop: 10,
    letterSpacing: 2,
  },

  loading: {
    textAlign: "center",
    color: "#ba9d7d",
  },

  empty: {
    textAlign: "center",
    color: "#ba9d7d",
    opacity: 0.7,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 25,
    maxWidth: 1100,
    margin: "0 auto",
  },

  card: {
    textAlign: "center",
  },

  frame: {
    border: "1px solid #ba9d7d",
    padding: 8,
    height: 180,
    backgroundColor: "#111",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  name: {
    marginTop: 12,
    fontSize: 13,
    letterSpacing: 2,
    color: "#ba9d7d",
  },

  price: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 2,
    color: "#ba9d7d",
    opacity: 0.85,
  },
};