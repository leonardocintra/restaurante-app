"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
    const pedidoGerado = generateOrderNumber();

    fetch("/api/aws/", {
      method: "POST",
      body: JSON.stringify({ pedido: pedidoGerado, nome, telefone }),
      headers: { "Content-Type": "application/json" },
    });

    setPedido(pedidoGerado);
  };

  return (
    <div className="text-center">
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
      </div>

      {pedido && (
        <div className="mt-8">
          <div>Pedido criado com o número: {pedido}</div>
          <div>Aguarde um momento enquanto o pedido é processado.</div>
        </div>
      )}
    </div>
  );
}
