// src/NewTask.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

interface NewTaskProps {
    isVisible: boolean;
    hideTaskModal: () => void;
}

export function NewTask({ isVisible, hideTaskModal }: NewTaskProps) {
    const [dateTime, setDateTime] = useState<string>('');
    const [categorias, setCategorias] = useState<any[]>([]);

    const getTodayAtMidnight = (): string => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.toLocaleString('sv-SE').slice(0, 16);
    };

    useEffect(() => {
        setDateTime(getTodayAtMidnight());
        axios
            .get('http://localhost:5000/categorias')
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error('Erro ao carregar categorias:', error);
            });
    }, []);

    return (
        <div
            className={`flex fixed bg-black/70 w-screen h-screen z-1000 items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="flex flex-col bg-zinc-200 h-fit p-8 gap-4">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-bold text-2xl">Criar nova tarefa</h1>
                    <button onClick={hideTaskModal} className="cursor-pointer">
                        <X className="bg-red-500 p-2 box-content rounded-full text-white" />
                    </button>
                </div>
                <form className="flex flex-col gap-2">
                    <label htmlFor="tarefa">Titulo da Tarefa</label>
                    <input
                        type="text"
                        placeholder="Tarefa"
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                        id="tarefa"
                    />
                    <label htmlFor="description">Descrição</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                        id="description"
                    />
                    <label htmlFor="datetime">Escolha uma data e hora:</label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                    />
                    <label htmlFor="prioridade">Prioridade</label>
                    <select
                        name="prioridade"
                        id="prioridade"
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                    >
                        <option disabled>Selecione uma Opção</option>
                        <option value="Alto">Alta</option>
                        <option value="Media">Média</option>
                        <option value="Baixa">Baixa</option>
                    </select>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        name="categoria"
                        id="categoria"
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                    >
                        <option disabled>Selecione uma Opção</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.name} value={categoria.name}>
                                {categoria.name}
                            </option>
                        ))}
                    </select>
                </form>
            </div>
        </div>
    );
}
