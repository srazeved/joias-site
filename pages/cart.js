import { useCart } from "../lib/cart";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart?.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>CARRINHO</h1>

      {(!cart || cart.length === 0) && (
        <p style={styles.empty}>Carrinho vazio</p>
      )}

      {cart?.map((item, index) => (
        <div key={index} style={styles.item}>

          <p>{item.name?.toUpperCase()}</p>
          <p>€ {item.price}</p>

          <button
            style={styles.btn}
            onClick={() => removeFromCart(item.id)}
          >
            REMOVER
          </button>

        </div>
      ))}

      <h2 style={styles.total}>
        TOTAL: € {total || 0}
      </h2>

    </div>
  );
}

const styles = {

  page: {
    padding: 100,
    color: "#ba9d7d",
    backgroundColor: "#0B0B0D",
    minHeight: "100vh",
  },

  title: {
    marginBottom: 30,
  },

  item: {
    borderBottom: "1px solid #ba9d7d",
    padding: 10,
    marginBottom: 10,
  },

  btn: {
    marginTop: 10,
    background: "transparent",
    border: "1px solid #ba9d7d",
    color: "#ba9d7d",
    cursor: "pointer",
  },

  total: {
    marginTop: 30,
  },

  empty: {
    opacity: 0.7,
  },
};