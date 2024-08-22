"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function CriarPedido() {
  const [mensagem, setMensagem] = useState("");

  const criarPedido = async () => {
    fetch("/api/aws/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setMensagem("Pedido criado com sucesso! - " + new Date().toISOString());
  };

  return (
    <div className="text-center">
      <div>
        <Button onClick={() => criarPedido()}>Teste SQS</Button>
      </div>
      <div>{mensagem}</div>
    </div>
  );
}
