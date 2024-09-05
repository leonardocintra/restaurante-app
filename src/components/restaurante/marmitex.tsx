import { Beef, EggFried, Salad } from "lucide-react";
import { useEffect, useState } from "react";
import { IMarmitexConfiguracao } from "restaurante";

export default function MarmitexComponent() {
  const [configuracao, setConfiguracao] = useState<IMarmitexConfiguracao[]>([]);

  useEffect(() => {
    fetch("/api/sandra/marmitex")
      .then((res) => res.json())
      .then((data) => {
        setConfiguracao(data);
      });
  }, []);

  if (!configuracao) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="my-4">
        <h2 className="text-2xl">Selecione o marmitex</h2>
        <h3 className="text-slate-600">Carnes | Guarnições | Salada </h3>
      </div>
      <div>
        <div className="grid grid-cols-3">
          {configuracao.map((item) => (
            <div key={item.tipoMarmitex} className="border m-1 rounded-md py-4 hover:bg-pink-200 transition duration-200">
              <div className="font-sans text-xl font-extrabold">
                {item.tipoMarmitex}
              </div>
              <div className="text-pink-800 font-semibold my-2">
                R$ {item.preco}
              </div>
              <div className="space-y-1">
                <div className="flex space-x-2 justify-center sm:justify-start ml-0 sm:ml-5">
                  <Beef className="text-red-700" />
                  <div className="font-extrabold">{item.maxCarnes}</div>
                  <div className="hidden sm:block">Carnes</div>
                </div>

                <div className="flex space-x-2 justify-center sm:justify-start ml-0 sm:ml-5">
                  <EggFried className="text-yellow-600" />
                  <div className="font-extrabold">{item.maxGuarnicoes}</div>
                  <div className="hidden sm:block">Guarnições</div>
                </div>

                <div className="flex space-x-2 justify-center sm:justify-start ml-0 sm:ml-5">
                  <Salad className="text-green-800" />
                  <div className="font-extrabold">{item.maxSaladas}</div>
                  <div className="hidden sm:block">Saladas</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
