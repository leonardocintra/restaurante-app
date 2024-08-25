"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function CriarPedido() {
  const [pedido, setPedido] = useState("");

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
      body: JSON.stringify({ pedido: pedidoGerado }),
      headers: { "Content-Type": "application/json" },
    });

    setPedido(pedidoGerado);
  };

  return (
    <div className="text-center">
      <div>
        <Button disabled={!!pedido} onClick={() => criarPedido()}>
          Fazer meu pedido
        </Button>
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
