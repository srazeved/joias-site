import "../styles/globals.css";

import { CartProvider } from "../lib/cart";

import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";

export default function App({
  Component,
  pageProps,
}) {
  return (
    <CartProvider>

      <div style={styles.app}>
  
        <Header />

        <CartDrawer />

        <main style={styles.main}>
          <Component {...pageProps} />
        </main>

      </div>

    </CartProvider>
  );
}

const styles = {
  app: {
    background: "#0B0B0D",
    minHeight: "100vh",
  },

  main: {
    paddingTop: "90px",
  },
};