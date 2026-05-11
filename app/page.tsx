export default function LuxuryJewelrySite() {
  const products = [
    {
      name: 'Colar Lunar Silver',
      price: '€89',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Brinco Aurora',
      price: '€59',
      image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Pulseira Velvet Shine',
      price: '€74',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop'
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>

        <div className="relative z-10 grid lg:grid-cols-2 items-center h-full px-6 lg:px-20 gap-10">
          <div>
            <p className="uppercase tracking-[0.3em] text-zinc-400 mb-4">
              Silver Luxury Collection
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Elegância em <span className="text-zinc-300">Prata</span>
            </h1>

            <p className="text-zinc-300 text-lg max-w-xl mb-8 leading-relaxed">
              Joias sofisticadas criadas para mulheres modernas.
              Uma experiência visual luxuosa apresentada pela influenciadora digital exclusiva da marca.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">
                Comprar Agora
              </button>

              <button className="border border-white px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all duration-300">
                Ver Coleção
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/influencer.png"
                alt="AI Influencer"
                className="w-[420px] lg:w-[520px] rounded-[3rem] shadow-2xl object-cover"
              />

              <div className="absolute -bottom-6 -left-6 bg-zinc-900/90 backdrop-blur-lg border border-zinc-700 rounded-3xl p-6 max-w-xs shadow-2xl">
                <p className="text-sm text-zinc-400 mb-2">Influenciadora Oficial</p>
                <h3 className="text-2xl font-bold mb-2">Aurora Silver</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  A personagem virtual da marca será usada em vídeos, campanhas, reels, anúncios e fotos promocionais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="py-24 px-6 lg:px-20 bg-zinc-950">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-zinc-500 mb-4">
            Coleção Exclusiva
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold">
            Joias em Prata Premium
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[380px] w-full object-cover hover:scale-110 transition-all duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-zinc-400 mb-6">
                  Design elegante com acabamento premium.
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{product.price}</span>

                  <button className="bg-white text-black px-5 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARKETING */}
      <section className="py-24 px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="/influencer.png"
              alt="Fashion"
              className="rounded-[3rem] shadow-2xl"
            />
          </div>

          <div>
            <p className="uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Marketing Visual
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
              Conteúdo viral para redes sociais
            </h2>

            <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
              <p>
                A influenciadora virtual da marca pode aparecer em:
              </p>

              <ul className="space-y-4 list-disc pl-6">
                <li>Vídeos estilo TikTok e Instagram Reels</li>
                <li>Campanhas de luxo para anúncios pagos</li>
                <li>Fotos promocionais cinematográficas</li>
                <li>Apresentações de coleções</li>
                <li>Stories automáticos para redes sociais</li>
              </ul>
            </div>

            <button className="mt-10 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">
              Criar Campanha
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-10 px-6 lg:px-20 text-zinc-500 flex flex-col lg:flex-row justify-between gap-4">
        <p>© 2026 Aurora Silver Jewelry</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">TikTok</a>
          <a href="#" className="hover:text-white transition-colors">Pinterest</a>
        </div>
      </footer>
    </div>
  )
}
