import CriarPedido from "@/components/restaurante/criarPedido";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto mt-3">
      <div className="border-2 border-red-600 m-2 p-2 rounded-xl pb-8">
        <div className="text-3xl my-8 flex justify-center text-center space-x-1">
          <div>
            <h1 className="font-light italic">Restaurante </h1>
            <h2 className="text-red-700 font-mono font-semibold mt-2">Tempeiro & Amor</h2>
          </div>
        </div>

        <div className="">
          <CriarPedido />
        </div>
      </div>
    </main>
  );
}
