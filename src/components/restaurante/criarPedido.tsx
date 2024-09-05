"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MarmitexComponent from "./marmitex";

export default function CriarPedido() {
  const [pedido, setPedido] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  function generateOrderNumber(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderNumber = "";

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderNumber += characters[randomIndex];
    }

    return orderNumber;
  }

  const criarPedido = async () => {
    const numeroPedido = generateOrderNumber();

    fetch("/api/aws/", {
      method: "POST",
      body: JSON.stringify({ pedido: numeroPedido, nome, telefone }),
      headers: { "Content-Type": "application/json" },
    });

    setPedido(numeroPedido);
  };

  return (
    <div className="text-center px-4">
      <div className="my-3 p-2">
        <div>
          <MarmitexComponent />
        </div>

        <h2 className="font-serif text-3xl text-slate-700 my-4">
          Cardapio de hoje
        </h2>
        <div>
          <p>Carnes</p>
          <p>Pizzas</p>
          <p>Bebidas</p>
          <p>Sobremesas</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="space-y-2">
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
          <Button disabled={!!pedido} onClick={() => criarPedido()}>
            Fazer meu pedido
          </Button>
        </div>

        {pedido && (
          <div className="mt-8 space-y-3">
            <div className="mt-5">
              Pedido número:{" "}
              <span className="text-green-800 font-bold text-xl">{pedido}</span>
            </div>
            <div className="text-indigo-500 font-light">
              Seu pedido ja está na fila para montagem da marmita :D
            </div>
            <div className="text-red-700 font-light">
              Voce irá receber notificações no seu Whatsapp :D.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
