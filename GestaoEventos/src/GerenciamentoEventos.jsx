export function GerirEventos() {
    return (
        <>
            <h2>Gerenciar Eventos</h2>
            <div id="Cabecaclho">
                <label>Cliente</label>
                <input type="text" placeholder="Maria da Silva" />
                <label>Tipo</label>
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
                <label>Data</label>
                <input type="date" />
                <label>Hora</label>
                <input type="time" />
                <button type="submit">Buscar</button>
                <label>Buffet</label>
                <select name="buffet">
                    <option value="">Selecione uma opção</option>
                    <option value="Sim">Sim</option>
                    <option value="Nao">Não</option>
                </select>
                <label>Valor</label>
                <input type="text" placeholder="R$ 200,00"></input>
            </div>
            <div id="Colocarcards">

            </div>
        </>
    )
}