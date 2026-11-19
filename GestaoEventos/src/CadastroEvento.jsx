export function GerenciarEventos(){
    return(
<>
    <div id="cabecalhoGerirEvento">
        <h1>Cadastro de Eventos</h1>
    </div>
    <div id="formEvento">
        <h2>Informações do cliente</h2>
        <br/>
        <label>Nome do cliente</label>
        <input type="text" placeholder="Maria da Silva"/>
        <br/>
        <label>Telefone para contato</label>
        <input type="tel" placeholder="(00)00000-0000"/>
        <br/>
        <h2>Informações do evento</h2>
        <br/>
        <label>Endereço</label>
        <input type="text" placeholder="R. Maria Cristina, 50 - Casqueiro, Cubatão"/>
        <br/>
        <label>Data</label>
        <input type="date"/>
        <br/>
        <label>Hora do evento</label>
        <input type="time"/>
        <br/>
        <label>Quantidade de convidados</label>
        <input type="number" placeholder="10"/>
        <br/>
        <label> Tipo de evento</label>
        <br/>
        <label><input type="radio" name="tipoFesta" value="Aniversario" />Festa de aniversário</label>
        <br/>
        <label><input type="radio" name="tipoFesta" value="Formatura" />Formatura</label>
        <br/>
        <label><input type="radio" name="tipoFesta" value="Casamento" />Casamento</label>
        <br/>
        <label><input type="radio" name="tipoFesta" value="Corporativo" />Corporativo</label>
        <br/>
        <label><input type="radio" name="tipoFesta" value="ChaBebe" />Chá de bebê/Chá revelação</label>
        <br/>
        <label><input type="radio" name="tipoFesta" value="Confraternizacao" />Confraternização</label>
        <br/>
        <label><input type="radio" name="tipoFesta" value="Palestra" />Workshop/Palestra</label>
        <br/>
        <label>Valor estimado</label>
        <input type="text" placeholder="R$ 200,00"/>
        <br/>
        <button type="submit">Cadastrar Evento</button>
    </div>    
</>
    )
}