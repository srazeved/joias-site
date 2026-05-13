import { supabase } from "../src/lib/supabase";

export async function getServerSideProps() {
  const { data, error } = await supabase.from("products").select("*");

  return {
    props: {
      products: data || [],
      error: error?.message || null,
    },
  };
}

export default function TestDB({ products, error }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Teste Supabase</h1>

      {error && (
        <p style={{ color: "red" }}>
          Erro: {error}
        </p>
      )}

      <h3>Produtos:</h3>

      <pre style={{ background: "#eee", padding: 20 }}>
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}