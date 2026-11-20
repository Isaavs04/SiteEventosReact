export function Card(){
    return(
        <div className="card">
            <div className="cardCabecalho">
                <span className="tipoE">Tipo de Evento</span>
                <button className="btnFechar">X</button>
            </div>
            <div className="cardCorpo">
                <p><strong>Cliente:</strong> Nome do cliente</p>
                <p><strong>Endereço:</strong> R. Maria Cristina, 50 - Casqueiro, Cubatão</p>
                <p><strong>Telefone:</strong> (00)00000-0000</p>
                <p><strong>Data:</strong> 00/00/0000</p>
                <p><strong>Hora:</strong> 00:00</p>
                <p><strong>Quantidade de convidados:</strong> 10</p>
                <p><strong>Buffet:</strong> Sim</p>
                <p><strong>Valor:</strong> R$ 200,00</p>
                <button className="btnEditar">Editar Evento</button>
            </div>
        </div>
    );
}