import { useRouter } from "next/router";

const data = {
  aneis: {
    title: "Anéis",
    subtitle: "Minimalismo eterno em prata",
  },
  brincos: {
    title: "Brincos",
    subtitle: "Movimento e luz",
  },
  colares: {
    title: "Colares",
    subtitle: "Elegância sobre a pele",
  },
};

export default function Collection() {
  const router = useRouter();
  const { collection } = router.query;

  const page = data[collection];

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Produto não encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-6xl font-light tracking-wide">
        {page.title}
      </h1>

      <p className="mt-4 text-gray-400">
        {page.subtitle}
      </p>

    </div>
  );
}