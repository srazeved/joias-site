import Link from "next/link";

export default function Shop() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      
      {/* Título elegante */}
      <h1 className="text-5xl font-light tracking-wide">
        Explore as Coleções
      </h1>

      <p className="mt-4 text-gray-400">
        Escolha o universo que deseja descobrir
      </p>

      {/* Entradas estilo luxo */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        
        <Link href="/shop/aneis">
          <div className="border border-white/20 p-10 hover:bg-white hover:text-black transition">
            Anéis
          </div>
        </Link>

        <Link href="/shop/brincos">
          <div className="border border-white/20 p-10 hover:bg-white hover:text-black transition">
            Brincos
          </div>
        </Link>

        <Link href="/shop/colares">
          <div className="border border-white/20 p-10 hover:bg-white hover:text-black transition">
            Colares
          </div>
        </Link>

      </div>
    </div>
  );
}