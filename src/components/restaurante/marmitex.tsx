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
      <h2>Listar marmitex aqui</h2>
      <div>
        {configuracao.map((item) => (
          <div key={item.tipoMarmitex} className="flex text-xs mb-4 justify-between hover:bg-slate-200 rounded-lg p-1">
            <div>
              <p>
                {item.tipoMarmitex}
                <br />
                R$ {item.preco}
              </p>
            </div>
            <div className="space-x-2 flex">
              <p>Max. Carnes: {item.maxCarnes}</p>
              <p>Max: Guarnições: {item.maxGuarnicoes}</p>
              <p>Max: Saladas: {item.maxSaladas}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
