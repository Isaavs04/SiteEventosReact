import { Card } from './CardEvento';

export function GerirEventos({ listaEventos = [], aoDeletar, aoEditar }) {
    return (
        <>
            <div id="segundaColuna">
                <h1 className="tituloGere">Gerenciar Eventos</h1>
                <div id="Cabecacalho">
                    <label className="labelCabecalho">Cliente</label>
                    <input className="inputPersonalizadoGerenciar" type="text" placeholder="Maria da Silva" />
                    <label className="labelCabecalho">Tipo</label>
                    <select name="tipoEvento">
                        <option value="">Selecione uma opção</option>
                        <option value="Casamento">Casamento</option>
                        <option value="Aniversario">Festa de Aniversário</option>
                        <option value="Formatura">Formatura</option>
                        <option value="Corporativo">Corporativo</option>
                        <option value="ChaBebe">Chá de bebê/Chá revelação</option>
                        <option value="Confraternizacao">Confraternização</option>
                        <option value="Palestra">Workshop/Palestra</option>
                    </select>
                    <label className="labelCabecalho">Data</label>
                    <input type="date" />
                    <label className="labelCabecalho">Hora</label>
                    <input type="time" />
                    <label className="labelCabecalho">Buffet</label>
                    <select name="buffet">
                        <option value="">Selecione uma opção</option>
                        <option value="Sim">Sim</option>
                        <option value="Nao">Não</option>
                    </select>
                    <label className="labelCabecalho">Valor</label>
                    <input className="inputPersonalizadoGerenciar" type="text" placeholder="R$ 200,00"></input>
                    <button className="btnBuscar" type="submit">Buscar</button>
                </div>
                <div id="Colocarcards">
                    {listaEventos.map((evento, index) => {
                        return (
                            <Card
                                key={index}
                                dadosEvento={evento}
                                onDeletar={() => aoDeletar(index)}
                                onEditar={() => aoEditar(evento, index)} 
                            />
                        );
                    })}
                </div>
            </div>
        </>
    )
}