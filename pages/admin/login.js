import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Erro no login");
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <div style={{ background: "#0B0B0D", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ padding: 40, border: "1px solid #222", borderRadius: 10, minWidth: 300 }}>
        
        <h1 style={{ color: "#ba9d7d", marginBottom: 20 }}>ADMIN LOGIN</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 10,
            background: "#ba9d7d",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ENTRAR
        </button>

      </div>
    </div>
  );
}