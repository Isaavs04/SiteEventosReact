import { useState, useEffect } from "react";
import "./Carrossel.css";

import foto1 from "../../assets/imagem-brinde.jpg";
import foto2 from "../../assets/imagem-casamento.jpg";
import foto3 from "../../assets/imagem-mesaPosta.jpg";
import foto4 from "../../assets/imagem-decoracao.jpg";

function Carrossel() {

const imagens = [foto1, foto2, foto3, foto4];

 const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {

        const intervalo = setInterval(() => {

            setSlideAtual((atual) =>
                (atual + 1) % imagens.length
            );

        }, 5000);

        return () => clearInterval(intervalo);

    }, [imagens.length]);

    return (
        <div className="carrossel">
       <img key={slideAtual} src={imagens[slideAtual]} alt={`Imagem ${slideAtual + 1} do carrosssel`}/>
        </div>
    );
}

export default Carrossel;