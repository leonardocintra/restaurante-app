import { useEffect, useState } from "react";
import { ICardapio, IMarmitexConfiguracao } from "restaurante";

type CardapioComponentProps = {
  marmitex: IMarmitexConfiguracao | null;
  onItemsSelecionados: (items: string[]) => void;
};

export default function CardapioComponent(props: CardapioComponentProps) {
  const [cardapio, setCardapio] = useState<ICardapio[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState<string[]>([]);
  const marmitex = props.marmitex;

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
      const handleItem = [...itemSelecionado, item];
      setItemSelecionado(handleItem);
      props.onItemsSelecionados(handleItem);
    } else {
      const handleItem = itemSelecionado.filter((i) => i !== item);
      setItemSelecionado(handleItem);
      props.onItemsSelecionados(handleItem);
    }
  }

  function itemEstaSelecionado(item: string) {
    const selecionado = itemSelecionado.includes(item);
    if (selecionado) {
      return "border-2 border-green-600 bg-emerald-300 font-semibold shadow-md";
    }
  }

  function exibirQuantidadeMaxima(tipo: string) {
    if (!marmitex) {
      return "0";
    } else if (tipo === "carne") {
      return marmitex.maxCarnes;
    } else if (tipo === "guarnicao") {
      return marmitex.maxGuarnicoes;
    } else if (tipo === "salada") {
      return marmitex.maxSaladas;
    } else {
      return "1";
    }
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-slate-700 my-4">
        Cardapio de hoje
      </h2>
      <div className="max-w-xs flex flex-col mx-auto">
        {cardapio.map((c) => (
          <div key={c.tipo} className={props.marmitex ? "" : "hidden"}>
            <div className="font-bold uppercase mt-6 text-2xl flex justify-center space-x-2 items-center">
              <div>{c.tipo}</div>
              <div className="text-sm text-slate-500">
                Qtd. ({exibirQuantidadeMaxima(c.tipo)})
              </div>
            </div>
            {c.items.map((item, index) => (
              <div key={index} onClick={() => adicionarRemoverItem(item)}>
                <div
                  className={`border m-2 font-sans font-light hover:font-semibold hover:bg-slate-200 transition rounded-lg py-3 text-lg 
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
