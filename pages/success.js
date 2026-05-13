// pages/success.js

import Link from "next/link";

export default function Success() {
  return (
    <div style={styles.page}>

      <h1 style={styles.title}>
        PAGAMENTO REALIZADO
      </h1>

      <p style={styles.text}>
        Obrigado pela sua compra.
      </p>

      <Link href="/">
        <button style={styles.button}>
          VOLTAR À LOJA
        </button>
      </Link>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#0B0B0D",
    color: "#ba9d7d",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    letterSpacing: 4,
    marginBottom: 20,
  },

  text: {
    opacity: 0.8,
    marginBottom: 30,
  },

  button: {
    background: "#ba9d7d",
    border: "none",
    padding: "15px 30px",
    cursor: "pointer",
    letterSpacing: 2,
  },
};