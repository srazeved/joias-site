import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("products")
        .select("*");

      setProducts(data || []);
    }

    load();

    const style = document.createElement("style");
    style.innerHTML = `
      a.social-icon:hover {
        transform: scale(1.15);
        filter: brightness(1.2);
      }

      a.social-icon {
        transition: all 0.3s ease;
      }

      a.nav-link:hover {
        opacity: 0.6;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <header style={styles.header}>

        <div style={styles.brand}>
          <div style={styles.brandTop}>AURORA</div>
          <div style={styles.brandBottom}>SILVER</div>
        </div>

        <div style={styles.nav}>

          <a href="/" className="nav-link" style={styles.navItem}>HOME</a>
          <a href="/shop" className="nav-link" style={styles.navItem}>SHOP</a>
          <a href="/sobre" className="nav-link" style={styles.navItem}>SOBRE</a>
          <a href="/contacto" className="nav-link" style={styles.navItem}>CONTACTO</a>

          <a href="/cart" style={styles.cart} title="Carrinho">
            👜
          </a>

        </div>

      </header>

      {/* HERO */}
      <div style={styles.hero}>
        <Image
          src="/images/influencer.jpg"
          alt="hero"
          fill
          priority
          style={styles.heroImage}
        />

        <div style={styles.overlay} />

        <div style={styles.heroContent}>
          <h1 style={styles.title}>Aurora Silver</h1>

          <p style={styles.subtitle}>
            Timeless elegance. Crafted in light.
          </p>

          {/* 💎 BOTÃO CORRIGIDO */}
          <button
            onClick={() => router.push("/shop")}
            style={styles.button}
          >
            EXPLORE AS COLEÇÕES
          </button>

        </div>
      </div>

      {/* LANÇAMENTOS */}
      <section style={styles.section}>

        <div style={styles.lineWrapper}>
          <div style={styles.fadeLine} />
          <h2 style={styles.sectionTitle}>LANÇAMENTOS</h2>
          <div style={styles.fadeLine} />
        </div>

        <div style={styles.grid}>

          {products.map((p) => {

            let images = p.images;

            try {
              if (typeof images === "string") {
                images = JSON.parse(images);
              }
            } catch {
              images = [];
            }

            return (
              <Link key={p.id} href={p?.id ? `/product/${p.id}` : "#"}>
                <div style={styles.cardWrapper}>

                  <div style={styles.frame}>
                    <Image
                      src={images?.[0] || "/images/placeholder.jpg"}
                      alt={p.name}
                      width={300}
                      height={300}
                      style={styles.image}
                    />
                  </div>

                  <p style={styles.text}>{p.name?.toUpperCase()}</p>
                  <p style={styles.text}>€ {p.price}</p>

                </div>
              </Link>
            );
          })}

        </div>

      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} AURORA SILVER</p>
      </footer>

    </div>
  );
}

/* 💎 ESTILOS */
const styles = {

  page: {
    backgroundColor: "#0B0B0D",
    color: "white",
    fontFamily: "'Inter', sans-serif",
  },

  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    padding: "25px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },

  brand: {
    textAlign: "center",
    color: "#ba9d7d",
    fontFamily: "'Playfair Display', serif",
  },

  brandTop: { fontSize: 14 },
  brandBottom: { fontSize: 10, opacity: 0.8 },

  nav: {
    display: "flex",
    gap: 25,
    alignItems: "center",
  },

  navItem: {
    color: "#ba9d7d",
    textDecoration: "none",
    fontSize: 12,
    letterSpacing: 2,
  },

  cart: {
    color: "#ba9d7d",
    fontSize: 18,
  },

  hero: {
    position: "relative",
    height: "100vh",
  },

  heroImage: {
    objectFit: "cover",
    filter: "blur(3px) brightness(0.7)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
  },

  heroContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
  },

  title: {
    fontSize: 64,
    fontFamily: "'Playfair Display', serif",
  },

  subtitle: {
    color: "#ba9d7d",
  },

  button: {
    marginTop: 20,
    padding: "12px 28px",
    border: "1px solid #ba9d7d",
    background: "transparent",
    color: "#ba9d7d",
    cursor: "pointer",
    letterSpacing: 2,
  },

  section: {
    padding: "100px 40px",
    textAlign: "center",
  },

  lineWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 60,
  },

  fadeLine: {
    height: 1,
    width: 120,
    background: "linear-gradient(to right, transparent, #ba9d7d, transparent)",
  },

  sectionTitle: {
    color: "#ba9d7d",
    fontSize: 26,
    letterSpacing: 4,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 30,
    maxWidth: 1000,
    margin: "0 auto",
  },

  cardWrapper: {
    textAlign: "center",
  },

  frame: {
    border: "1px solid #ba9d7d",
    padding: 8,
    height: 170,
    overflow: "hidden",
    background: "#111",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  text: {
    color: "#ba9d7d",
    fontSize: 13,
    marginTop: 6,
    fontFamily: "'Playfair Display', serif",
  },

  footer: {
    padding: 40,
    textAlign: "center",
    fontSize: 12,
    opacity: 0.8,
  },
};