import React, { useState, useEffect } from "react";
import './ToDolist.css';
import Icone from './assets/icon.png';

function ToDoList() {
    const listaStorage = localStorage.getItem('Lista'); // constante utilizada para salvar o estado da lista no navegador, para não peder as informações ao recarregar a página ou sair dela

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []); //JSON.parse() é utilizado para transformar o formato String, pois quando um item é salvo no "listaStorage", ele sempre será salvo no formato String
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista)); // Etapa utilizada quando é salvo a lista no navegador em String
    }, [lista])

    function adicionaItem(form) {
        form.preventDefault(); //Utilizao para não disparar o formulário, senão a página será atualizada.
        if (!novoItem) {
            return
        }
        setLista([...lista, { text: novoItem, isCompleted: false }]); //isCompleted indica se a tarefa foi realizada ou não, caso false indica que ainda está pendente, caso true a escrita fica riscada
        setNovoItem(""); // caso uma nova tarefa for adicionada, o texto é colocado como vazio
        document.getElementById('input-entrada').focus(); //mantém o foco na adição de uma nova tarefa
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletou(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1); //.splice() é uma função de manipulação de listas, utilizada aqui para remover o item da lista com aquele "index", o "1" define a quantidade de itens removidos
        setLista(listaAux);
    }

    function deletouTodas(){
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    onChange={(e) => { setNovoItem(e.target.value) }}
                    placeholder="Adicione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                <div style={{ textAlign: 'center' }}>
                    {
                        lista.length < 1
                            ?
                            <img className="icone-central" src={Icone} />
                            :
                            lista.map((item, index) => ( //.map() é utilizado para percorrer toda a "lista", ele vai repetir a <div> cada vez que tiver um item la dentro da "lista"
                                <div
                                    key={index} // identificação dos itens, utilizado para a diferenciação dos itens
                                    className={item.isCompleted ? "item completo" : "item"}
                                >
                                    <span onClick={() => { clicou(index) }}>{item.text}</span>
                                    <button onClick={() => { deletou(index) }} className="del">Deletar</button>
                                </div>
                            ))
                    }
                </div>

                {
                    lista.length > 0 && <button onClick={() => {deletouTodas()}} className="deleteAll">Deletar Todas</button>
                }

            </div>
        </div>
    )
}

export default ToDoList