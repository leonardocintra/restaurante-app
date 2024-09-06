import { useEffect, useState } from "react";
import { ICardapio } from "restaurante";

export default function CardapioComponent() {
  const [cardapio, setCardapio] = useState<ICardapio[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState<string[]>([]);

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

  function adicionarRemoverItem(item: string) {
    const index = itemSelecionado.indexOf(item);
    if (index === -1) {
      setItemSelecionado([...itemSelecionado, item]);
    } else {
      setItemSelecionado(itemSelecionado.filter((i) => i !== item));
    }
  }

  function itemEstaSelecionado(item: string) {
    const selecionado = itemSelecionado.includes(item);
    if (selecionado) {
      return "border-2 border-green-600 bg-emerald-300 font-semibold shadow-md font-mono";
    }
  }

  console.log(itemSelecionado);

  return (
    <div>
      <h2 className="font-serif text-3xl text-slate-700 my-4">
        Cardapio de hoje
      </h2>
      <div className="max-w-sm flex flex-col mx-auto">
        {cardapio.map((c) => (
          <div key={c.tipo}>
            <div className="font-bold uppercase mt-6 text-2xl">{c.tipo}</div>
            {c.items.map((item, index) => (
              <div key={index} onClick={() => adicionarRemoverItem(item)}>
                <div
                  className={`border m-2 p-1 hover:bg-slate-200 transition rounded-lg 
                    ${itemEstaSelecionado(item)}`}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
