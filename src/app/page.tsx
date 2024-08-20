import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="text-center text-3xl my-8">
        <h1>Restaurante Tempeiro & Amor</h1>
      </div>

      <div className="max-w-lg mx-auto flex flex-col items-center justify-center space-y-3">
        <div>Estamos em construção</div>
        <div>
          <Button>Teste SQS</Button>
        </div>
      </div>
    </div>
  );
}
