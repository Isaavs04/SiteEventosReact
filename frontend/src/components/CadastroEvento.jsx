import { useState, useEffect } from 'react';

export function CadastrarEvento({ aoSalvar, eventoEditando }) {
    const [cliente, setCliente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [qtdConvidados, setQtdConvidados] = useState('');
    const [tipo, setTipo] = useState('');
    const [buffet, setBuffet] = useState('');
    const [valor, setValor] = useState('');

    useEffect(() => {
        if (eventoEditando) {
            setCliente(eventoEditando.cliente);
            setTelefone(eventoEditando.telefone);
            setEndereco(eventoEditando.endereco);
            setData(eventoEditando.data);
            setHora(eventoEditando.hora);
            setQtdConvidados(eventoEditando.qtdConvidados);
            setTipo(eventoEditando.tipo);
            setBuffet(eventoEditando.buffet);
            setValor(eventoEditando.valor);
        }
    }, [eventoEditando]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventoObjeto = {
            cliente,
            telefone,
            endereco,
            data,
            hora,
            qtdConvidados,
            tipo,
            buffet,
            valor
        };
        const salvou = await aoSalvar(eventoObjeto);
        if (!salvou) return; // se deu erro, mantém o formulário preenchido
        setCliente('');
        setTelefone('');
        setEndereco('');
        setData('');
        setHora('');
        setQtdConvidados('');
        setTipo('');
        setBuffet('');
        setValor('');
    };
    return (
        <>
            <form id="formEvento" onSubmit={handleSubmit}>
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
                        <input className="inputPersonalizado" type="text" placeholder="Maria da Silva" value={cliente} onChange={(e) => setCliente(e.target.value)} />
                        <br />
                        <label>Telefone para contato</label>
                        <br />
                        <input className="inputPersonalizado" type="tel" placeholder="(00)00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        <br />
                        <h2>Informações do evento</h2>
                        <hr></hr>
                        <br />
                        <label>Endereço</label>
                        <br />
                        <input className="inputPersonalizado" type="text" placeholder="R. Maria Cristina, 50 - Casqueiro, Cubatão" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                        <br />
                        <label>Data</label>
                        <br />
                        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
                        <br />
                        <label>Hora do evento</label>
                        <br />
                        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                        <br />
                        <label>Quantidade de convidados</label>
                        <br />
                        <input type="number" placeholder="10" min={5} max={200} value={qtdConvidados} onChange={(e) => setQtdConvidados(e.target.value)} />
                        <br />
                        <label> Tipo de evento</label>
                        <br />
                        <select name="tipoEvento" value={tipo} onChange={(e) => setTipo(e.target.value)}>
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
                            <input type="radio" id="buffetSim" name="buffet" value="Sim" checked={buffet === 'Sim'} onChange={(e) => setBuffet(e.target.value)} />
                            <label htmlFor="buffetSim" className="radio-label">Sim</label>
                            <input type="radio" id="buffetNao" name="buffet" value="Nao" checked={buffet === 'Nao'} onChange={(e) => setBuffet(e.target.value)} />
                            <label htmlFor="buffetNao" className="radio-label">Não</label>
                        </div>
                        <br />
                        <label>Valor estimado</label>
                        <br />
                        <input className="inputPersonalizado" type="text" placeholder="R$ 200,00" value={valor} onChange={(e) => setValor(e.target.value)} />
                        <br />
                        <button className="btnCadastro" type="submit">Salvar Evento</button>

                    </div>

                </div>
            </form>
        </>
    )
}