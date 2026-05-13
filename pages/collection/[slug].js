import { supabase } from "../../src/lib/supabase";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const slug = params.slug;

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("collection", slug);

  return {
    props: {
      products: products || [],
      slug,
    },
  };
}

export default function CollectionPage({ products, slug }) {

  const collections = {
    Bridal: {
      title: "Bridal Collection",
      description:
        "A celebration of timeless elegance, crafted for unforgettable moments.",
      hero: "/collections/bridal/hero.jpg"
    },

    Heritage: {
      title: "Heritage Collection",
      description:
        "Classic sophistication inspired by enduring beauty and refined craftsmanship.",
      hero: "/collections/heritage/hero.jpg"
    },

    Minimal: {
      title: "Minimal Collection",
      description:
        "Pure forms, subtle details and modern luxury in its most refined expression.",
      hero: "/collections/minimal/hero.jpg"
    }
  };

  const info = collections[slug];

  return (
    <div>

      {/* =========================
          HERO CINEMATOGRÁFICO
      ========================= */}
      <div style={{
        position: "relative",
        height: "70vh",
        overflow: "hidden",
        marginBottom: 70
      }}>

        {/* imagem */}
        <img
          src={info.hero}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.55)"
          }}
        />

        {/* overlay texto */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          padding: 20
        }}>

          <p style={{
            letterSpacing: 5,
            textTransform: "uppercase",
            opacity: 0.7,
            fontSize: 11
          }}>
            Aurora Silver
          </p>

          <h1 style={{
            fontFamily: "Playfair Display",
            fontSize: 52,
            margin: "10px 0"
          }}>
            {info.title}
          </h1>

          <p style={{
            maxWidth: 600,
            opacity: 0.85,
            lineHeight: 1.7
          }}>
            {info.description}
          </p>

        </div>

      </div>

      {/* =========================
          PRODUTOS
      ========================= */}
      <div className="container">

        <div className="grid" style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 50
        }}>

          {products.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`}>
              <div className="card" style={{
                background: "transparent",
                border: "none",
                textAlign: "center",
                cursor: "pointer",
                transition: "0.4s ease"
              }}>

                <img
                  src={product.images?.[0]}
                  style={{
                    height: 180,
                    objectFit: "contain",
                    marginBottom: 15,
                    transition: "0.4s ease"
                  }}
                />

                <h3 style={{
                  fontWeight: 400,
                  fontSize: 14
                }}>
                  {product.name}
                </h3>

                <p style={{
                  opacity: 0.6
                }}>
                  {product.price}€
                </p>

              </div>
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}