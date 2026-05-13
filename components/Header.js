import Link from "next/link";
import { useCart } from "../lib/cart";

export default function Header() {
  const { cart, setOpenCart } = useCart();

  return (
    <header style={styles.header}>

      <Link href="/">
        <div style={styles.brand}>
          <div style={styles.top}>AURORA</div>
          <div style={styles.bottom}>SILVER</div>
        </div>
      </Link>

      <nav style={styles.nav}>
        <Link href="/">HOME</Link>
        <Link href="/shop">SHOP</Link>
        <Link href="/sobre">SOBRE</Link>
        <Link href="/contacto">CONTACTO</Link>

        {/* CART */}
        <button
          onClick={() => setOpenCart(true)}
          style={styles.cart}
        >
          👜 {cart.length}
        </button>
      </nav>

    </header>
  );
}

const styles = {

  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    background: "rgba(11,11,13,0.92)",
    backdropFilter: "blur(12px)",
    color: "#ba9d7d",
  },

  brand: {
    textAlign: "center",
    cursor: "pointer",
  },

  top: {
    fontSize: 14,
    letterSpacing: 3,
  },

  bottom: {
    fontSize: 10,
    opacity: 0.7,
  },

  nav: {
    display: "flex",
    gap: 20,
    alignItems: "center",
  },

  cart: {
    background: "transparent",
    border: "none",
    color: "#ba9d7d",
    cursor: "pointer",
    fontSize: 14,
  },
};