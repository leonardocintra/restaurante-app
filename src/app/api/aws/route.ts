const url = `${process.env.AWS_LAMBDA_URL_CRIAR_PEDIDO}`;

export async function POST(req: Request) {
  const data = await req.json();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      restaurante: "tempeiro-e-amor",
      pedido: data.pedido,
      nome: data.nome,
      telefone: data.telefone,
      item: "Carnes",
      status: {
        id: 1,
        descricao: "Pedido criado",
        data: new Date().toUTCString(),
      },
    }),
  });

  if (response.status === 201) {
    return Response.json(
      {
        mensagem: "Enviado para SNS com sucesso",
      },
      {
        status: 201,
      }
    );
  } else {
    return Response.json({
      statusCode: 500,
      body: JSON.stringify({
        message: "Falha ao tentar criar o pedido no SNS",
      }),
    });
  }
}
