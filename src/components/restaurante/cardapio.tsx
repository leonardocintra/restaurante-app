import { useEffect, useState } from "react";
import { ICardapio } from "restaurante";

export default function CardapioComponent() {
  const [cardapio, setCardapio] = useState<ICardapio[]>([]);

  useEffect(() => {
    fetch("/api/sandra/cardapio")
      .then((res) => res.json())
      .then((data) => {
        setCardapio(data);
      });
  }, []);

  if (!cardapio) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-slate-700 my-4">
        Cardapio de hoje
      </h2>
      <div>
        {cardapio.map((c) => (
          <div key={c.tipo}>
            <div className="font-bold uppercase mt-6 text-2xl">{c.tipo}</div>
            {c.items.map((item, index) => (
              <div key={index}>
                <div className="border m-1 p-1 hover:bg-slate-200 transition rounded-lg">{item}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
