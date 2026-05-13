import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import { supabase } from "../../lib/supabase";
import { useCart } from "../../lib/cart";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  async function loadProduct() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    setProduct(data);
  }

  if (!product) {
    return (
      <div style={styles.loading}>
        A carregar produto...
      </div>
    );
  }

  let images = [];

  try {
    images =
      typeof product.images === "string"
        ? JSON.parse(product.images)
        : product.images;
  } catch {
    images = [];
  }

  return (
    <div style={styles.page}>

      {/* IMAGE */}
      <div style={styles.imageWrap}>
        <Image
          src={images?.[0] || "/images/placeholder.jpg"}
          width={500}
          height={500}
          alt={product.name}
          style={styles.image}
        />
      </div>

      {/* INFO */}
      <div style={styles.info}>

        <h1 style={styles.name}>
          {product.name?.toUpperCase()}
        </h1>

        <p style={styles.price}>
          € {product.price}
        </p>

        <p style={styles.description}>
          {product.description}
        </p>

        {/* BUTTON */}
        <button
          style={styles.button}
          onClick={() => addToCart(product)}
        >
          ADICIONAR AO CARRINHO
        </button>

      </div>

    </div>
  );
}

const styles = {

  loading: {
    minHeight: "100vh",
    background: "#0B0B0D",
    color: "#ba9d7d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  page: {
    minHeight: "100vh",
    background: "#0B0B0D",
    color: "#ba9d7d",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    padding: "80px",
  },

  imageWrap: {
    border: "1px solid rgba(186,157,125,0.3)",
    padding: 20,
    background: "#111",
  },

  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  name: {
    fontSize: 36,
    letterSpacing: 4,
    marginBottom: 20,
  },

  price: {
    fontSize: 22,
    marginBottom: 30,
  },

  description: {
    opacity: 0.8,
    lineHeight: 1.8,
    marginBottom: 40,
  },

  button: {
    background: "#ba9d7d",
    color: "#111",
    border: "none",
    padding: "18px",
    cursor: "pointer",
    letterSpacing: 3,
    fontWeight: "bold",
  },
};