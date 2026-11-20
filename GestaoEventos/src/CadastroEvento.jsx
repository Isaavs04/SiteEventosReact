export function CadastrarEvento() {
    return (
        <>
            <div id="Cadastro">
                <div id="cabecalhoGerirEvento">
                    <h1 id="cdTitulo">Cadastro de Eventos</h1>
                </div>
                <div id="formEvento">
                    <h2>Informações do cliente</h2>
                    <hr></hr>
                    <br />
                    <label>Nome do cliente</label>
                    <br />
                    <input className="inputPersonalizado" type="text" placeholder="Maria da Silva" />
                    <br />
                    <label>Telefone para contato</label>
                    <br />
                    <input className="inputPersonalizado" type="tel" placeholder="(00)00000-0000" />
                    <br />
                    <h2>Informações do evento</h2>
                    <hr></hr>
                    <br />
                    <label>Endereço</label>
                    <br />
                    <input className="inputPersonalizado" type="text" placeholder="R. Maria Cristina, 50 - Casqueiro, Cubatão" />
                    <br />
                    <label>Data</label>
                    <br />
                    <input type="date" />
                    <br />
                    <label>Hora do evento</label>
                    <br />
                    <input type="time" />
                    <br />
                    <label>Quantidade de convidados</label>
                    <br />
                    <input type="number" placeholder="10" min={5} max={200} />
                    <br />
                    <label> Tipo de evento</label>
                    <br />
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
                    <br />
                    <label>Deseja buffet?</label>
                    <br />
                    <div className="grupo-radio">
                        <input type="radio" id="buffetSim" name="buffet" value="Sim" />
                        <label htmlFor="buffetSim" className="radio-label">Sim</label>

                        <input type="radio" id="buffetNao" name="buffet" value="Nao" />
                        <label htmlFor="buffetNao" className="radio-label">Não</label>
                    </div>
                    <br />
                    <label>Valor estimado</label>
                    <br />
                    <input className="inputPersonalizado" type="text" placeholder="R$ 200,00" />
                    <br />
                    <button className="btnCadastro" type="submit">Salvar Evento</button>
                </div>
            </div>

        </>
    )
}