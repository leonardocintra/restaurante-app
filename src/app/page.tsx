import CriarPedido from "@/components/restaurante/criarPedido";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto mt-3">
      <div className="border-2 border-red-600 m-2 p-2 rounded-xl pb-8">
        <div className="flex justify-center">
          <Image
            className="border rounded-md"
            src={"/img/tempeiro-e-amor.jpg"}
            alt="logo-tempeiro-e-amor"
            width={300}
            height={300}
          />
        </div>

        <div className="">
          <CriarPedido />
        </div>
      </div>
    </main>
  );
}
