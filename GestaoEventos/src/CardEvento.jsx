export function Card({ dadosEvento, onDeletar, onEditar }) {
    return(
        <div className="card">
            <div className="cardCabecalho">
                <span className="tipoE">{dadosEvento.tipo}</span>
                <button className="btnFechar" onClick={onDeletar}>X</button>
            </div>
            <div className="cardCorpo">
                <p><strong>Cliente:</strong> {dadosEvento.cliente}</p>
                <p><strong>Endereço:</strong> {dadosEvento.endereco}</p>
                <p><strong>Telefone:</strong> {dadosEvento.telefone}</p>
                <p><strong>Data:</strong> {dadosEvento.data}</p>
                <p><strong>Hora:</strong> {dadosEvento.hora}</p>
                <p><strong>Quantidade de convidados:</strong> {dadosEvento.qtdConvidados}</p>
                <p><strong>Buffet:</strong> {dadosEvento.buffet}</p>
                <p><strong>Valor:</strong> {dadosEvento.valor}</p>
            </div>
            <button className="btnEditar" onClick={onEditar}>Editar Evento</button>
        </div>
    );
}