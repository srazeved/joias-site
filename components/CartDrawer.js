// components/CartDrawer.js

import { useCart } from "../lib/cart";

export default function CartDrawer() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    openCart,
    setOpenCart,
  } = useCart();

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  return (
    <>
      {/* OVERLAY */}
      {openCart && (
        <div
          style={styles.overlay}
          onClick={() => setOpenCart(false)}
        />
      )}

      {/* DRAWER */}
      <div
        style={{
          ...styles.drawer,
          right: openCart ? 0 : "-420px",
        }}
      >

        {/* HEADER */}
        <div style={styles.header}>

          <h2 style={styles.title}>
            CARRINHO
          </h2>

          <button
            style={styles.close}
            onClick={() => setOpenCart(false)}
          >
            ✕
          </button>

        </div>

        {/* ITEMS */}
        <div style={styles.items}>

          {cart.length === 0 && (
            <p style={styles.empty}>
              O seu carrinho está vazio
            </p>
          )}

          {cart.map((item, index) => (

            <div
              key={`${item.id}-${index}`}
              style={styles.item}
            >

              <div style={styles.info}>

                <p style={styles.name}>
                  {item.name?.toUpperCase()}
                </p>

                <p style={styles.price}>
                  € {Number(item.price).toFixed(2)}
                </p>

                {/* QUANTITY */}
                <div style={styles.qtyRow}>

                  <button
                    style={styles.qtyBtn}
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span style={styles.qty}>
                    {item.quantity}
                  </span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              {/* REMOVE */}
              <button
                style={styles.remove}
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                REMOVER
              </button>

            </div>
          ))}

        </div>

        {/* FOOTER */}
        <div style={styles.footer}>

          <p style={styles.total}>
            TOTAL: € {total.toFixed(2)}
          </p>

          <button
  style={styles.checkout}
  onClick={async () => {

    const response = await fetch(
      "/api/checkout",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({ cart }),
      }
    );

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }}
>
  FINALIZAR COMPRA
</button>

        </div>

      </div>
    </>
  );
}

const styles = {

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    zIndex: 998,
  },

  drawer: {
    position: "fixed",
    top: 0,
    width: 400,
    height: "100vh",
    background: "#111",
    zIndex: 999,
    transition: "0.4s",
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid rgba(186,157,125,0.3)",
    overflow: "hidden",
  },

  header: {
    padding: "30px",
    borderBottom: "1px solid rgba(186,157,125,0.15)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#ba9d7d",
    letterSpacing: 4,
    fontSize: 16,
    fontWeight: 400,
  },

  close: {
    background: "transparent",
    border: "none",
    color: "#ba9d7d",
    fontSize: 22,
    cursor: "pointer",
  },

  items: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    borderBottom: "1px solid rgba(186,157,125,0.15)",
    paddingBottom: 20,
    marginBottom: 20,
  },

  info: {
    flex: 1,
  },

  name: {
    color: "#ba9d7d",
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 10,
  },

  price: {
    color: "#ba9d7d",
    opacity: 0.75,
    marginBottom: 15,
  },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  qtyBtn: {
    width: 30,
    height: 30,
    border: "1px solid #ba9d7d",
    background: "transparent",
    color: "#ba9d7d",
    cursor: "pointer",
    fontSize: 16,
  },

  qty: {
    color: "#ba9d7d",
    minWidth: 20,
    textAlign: "center",
  },

  remove: {
    height: 34,
    alignSelf: "center",
    background: "transparent",
    border: "1px solid #ba9d7d",
    color: "#ba9d7d",
    cursor: "pointer",
    padding: "0 12px",
    fontSize: 11,
    letterSpacing: 1,
  },

  empty: {
    color: "#ba9d7d",
    opacity: 0.6,
    textAlign: "center",
    marginTop: 60,
  },

  footer: {
    padding: 25,
    borderTop: "1px solid rgba(186,157,125,0.15)",
  },

  total: {
    color: "#ba9d7d",
    marginBottom: 20,
    letterSpacing: 2,
  },

  checkout: {
    width: "100%",
    background: "#ba9d7d",
    color: "#111",
    border: "none",
    padding: 16,
    cursor: "pointer",
    letterSpacing: 3,
    fontWeight: "bold",
    fontSize: 12,
  },
};