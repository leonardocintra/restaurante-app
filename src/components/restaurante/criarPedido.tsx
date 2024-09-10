"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MarmitexComponent from "./marmitex";
import { FilePenLine, Laugh } from "lucide-react";
import CardapioComponent from "./cardapio";
import { IMarmitexConfiguracao } from "restaurante";

export default function CriarPedido() {
  const [pedido, setPedido] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [marmitex, setMarmitex] = useState<IMarmitexConfiguracao | null>(null);
  const [itemsSelecionado, setItemSelecionado] = useState<string[]>([]);

  function generateOrderNumber(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderNumber = "";

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderNumber += characters[randomIndex];
    }

    return orderNumber;
  }

  function handleMarmitexSelecionado(marmitex: IMarmitexConfiguracao) {
    setMarmitex(marmitex);
  }

  function handleItemsSelecionados(items: string[]) {
    setItemSelecionado(items);
  }

  const criarPedido = async () => {
    const numeroPedido = generateOrderNumber();

    console.log(itemsSelecionado);

    fetch("/api/aws/", {
      method: "POST",
      body: JSON.stringify({
        pedido: numeroPedido,
        nome,
        telefone,
        items: itemsSelecionado,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setPedido(numeroPedido);
  };

  if (pedido !== "") {
    return (
      <div className="text-center px-4">
        <div className="mt-8 space-y-3">
          <div>
            Informações do pedido de <strong> {nome} </strong>
          </div>
          <div className="mt-5">
            Pedido número:{" "}
            <span className="text-green-800 font-bold text-xl">{pedido}</span>
          </div>
          <div className="text-indigo-500 font-light">
            Seu pedido ja está na fila para montagem da marmita :D
          </div>
          <div className="text-red-700 font-light flex justify-center space-x-2">
            <div>Voce irá receber notificações no seu Whatsapp</div>

            <Laugh />
          </div>
        </div>

        <div className="mt-4">
          <Button
            onClick={() => window.location.reload()}
            variant={"secondary"}
          >
            Fazer novo pedido
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center px-4">
      <div className="my-3 p-2">
        <div>
          <MarmitexComponent onMarmitexSelect={handleMarmitexSelecionado} />
        </div>

        <div>
          <CardapioComponent
            marmitex={marmitex}
            onItemsSelecionados={handleItemsSelecionados}
          />
        </div>
      </div>

      <div className="space-y-2 flex flex-col items-center">
        <div className="text-2xl text-purple-800 font-semibold font-mono mt-3">
          <h3>Informe seus dados</h3>
        </div>

        <div className="space-y-2 px-6 max-w-xs">
          <Input
            type="text"
            placeholder="Seu nome ..."
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Whastapp ..."
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <div className="pt-5">
          <Button
            className="gap-3"
            disabled={!!pedido}
            onClick={() => criarPedido()}
          >
            Fazer meu pedido <FilePenLine />
          </Button>
        </div>
      </div>
    </div>
  );
}
