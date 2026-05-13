import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");
  const [featured, setFeatured] = useState(false);
  const [collection, setCollection] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  };

  const addProduct = async () => {
    await supabase.from("products").insert([
      {
        id: crypto.randomUUID(),
        name,
        description,
        price: Number(price),
        category,
        images,
        featured,
        collection,
        created_at: new Date().toISOString(),
      },
    ]);

    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImages("");
    setFeatured(false);
    setCollection("");

    fetchProducts();
  };

  return (
    <div style={{ padding: 40, background: "#0B0B0D", minHeight: "100vh", color: "#fff" }}>

      <h1 style={{ color: "#ba9d7d" }}>ADMIN • PRODUTOS</h1>

      {/* FORM */}
      <div style={{ display: "grid", gap: 10, maxWidth: 500, marginTop: 20 }}>

        <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />

        <input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />

        <input placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} />

        <input placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />

        <input placeholder="Imagens (URL)" value={images} onChange={(e) => setImages(e.target.value)} />

        <input placeholder="Coleção" value={collection} onChange={(e) => setCollection(e.target.value)} />

        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>

        <button onClick={addProduct} style={{ padding: 10, background: "#ba9d7d" }}>
          Adicionar Produto
        </button>

      </div>

      {/* LISTA */}
      <h2 style={{ marginTop: 40 }}>Produtos</h2>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #333", padding: 10, marginTop: 10 }}>
          <p><strong>{p.name}</strong></p>
          <p>{p.description}</p>
          <p>€{p.price}</p>
          <p>{p.category}</p>
          <p>{p.collection}</p>
          <p>{p.featured ? "⭐ Featured" : ""}</p>
        </div>
      ))}

    </div>
  );
}