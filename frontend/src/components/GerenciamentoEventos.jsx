import { useState } from 'react';
import { Card } from './CardEvento';
import '../styles/App.css';

const FILTROS_VAZIOS = { cliente: '', tipo: '', data: '', hora: '', buffet: '', valor: '' };

export function GerirEventos({ listaEventos = [], aoDeletar, aoEditar, aoBuscar }) {
    const [filtros, setFiltros] = useState(FILTROS_VAZIOS);

    const atualizarFiltro = (campo) => (e) => setFiltros({ ...filtros, [campo]: e.target.value });

    return (
        <>
            <title>Gestão de Eventos</title>
            <div id="segundaColuna">
                <h1 className="tituloGere">Gerenciar Eventos</h1>
                <div id="Cabecacalho">
                    <label className="labelCabecalho">Cliente</label>
                    <input className="inputPersonalizadoGerenciar" type="text" placeholder="Maria da Silva" value={filtros.cliente} onChange={atualizarFiltro('cliente')} />
                    <label className="labelCabecalho">Tipo</label>
                    <select className="select" name="tipoEvento" value={filtros.tipo} onChange={atualizarFiltro('tipo')}>
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
                    <input type="date" value={filtros.data} onChange={atualizarFiltro('data')} />
                    <label className="labelCabecalho">Hora</label>
                    <input type="time" value={filtros.hora} onChange={atualizarFiltro('hora')} />
                    <label className="labelCabecalho">Buffet</label>
                    <select name="buffet" value={filtros.buffet} onChange={atualizarFiltro('buffet')}>
                        <option value="">Selecione uma opção</option>
                        <option value="Sim">Sim</option>
                        <option value="Nao">Não</option>
                    </select>
                    <label className="labelCabecalho">Valor</label>
                    <input className="inputPersonalizadoGerenciar" type="text" placeholder="R$ 200,00" value={filtros.valor} onChange={atualizarFiltro('valor')}></input>
                    <button className="btnBuscar" type="button" onClick={() => aoBuscar(filtros)}>Buscar</button>
                </div>
                <div id="Colocarcards">
                    {listaEventos.length === 0 && <p>Nenhum evento encontrado.</p>}
                    {listaEventos.map((evento) => {
                        return (
                            <Card
                                key={evento.id}
                                dadosEvento={evento}
                                onDeletar={() => aoDeletar(evento.id)}
                                onEditar={() => aoEditar(evento)}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    )
}
