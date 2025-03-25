// src/NewTask.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

interface NewTaskProps {
    isVisible: boolean;
    hideTaskModal: () => void;
}

export function NewTask({ isVisible, hideTaskModal }: NewTaskProps) {
    const [due_date, setDue_date] = useState<string>('');
    const [categorys, setCategorys] = useState<any[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const getTodayAtMidnight = (): string => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.toLocaleString('sv-SE').slice(0, 16);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formatteddue_date = new Date(due_date).toISOString();
    
        const taskData = {
            title,
            description,
            due_date: formatteddue_date,
            status : "pending",
            priority,
            category,
        };
    
        console.log('Dados da Tarefa:', taskData);
        axios
            .post("http://localhost:5000/tarefas", taskData)
            .then(() => {
                console.log('Arquivo Colocado na API')
                window.alert('Tarefa Criada com sucesso')
            })
            .catch((error) => {
                console.error("Erro ao subir arquivo na api: ", error)
            })
    };

    useEffect(() => {
        setDue_date(getTodayAtMidnight());
        axios
            .get('http://localhost:5000/categorias')
            .then((response) => {
                setCategorys(response.data);
            })
            .catch((error) => {
                console.error('Erro ao carregar categorys:', error);
            });
    }, []);

    return (
        <div
            className={`flex fixed bg-black/70 w-screen h-screen z-1000 items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="flex flex-col bg-zinc-200 h-fit p-8 gap-4 rounded-lg">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-bold text-2xl">Criar nova tarefa</h1>
                    <button onClick={hideTaskModal} className="cursor-pointer">
                        <X className="bg-red-500 p-2 box-content rounded-full text-white" />
                    </button>
                </div>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <label htmlFor="tarefa">Titulo da Tarefa</label>
                    <input
                        type="text"
                        placeholder="Tarefa"
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                        id="tarefa"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="description">Descrição</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="due_date">Escolha uma data e hora:</label>
                    <input
                        type="datetime-local"
                        id="due_date"
                        value={due_date}
                        onChange={(e) => setDue_date(e.target.value)}
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                    />
                    <label htmlFor="priority">Prioridade</label>
                    <select
                        name="priority"
                        id="priority"
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option disabled selected>
                            Selecione uma Opção
                        </option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Média</option>
                        <option value="Baixa">Baixa</option>
                    </select>
                    <label htmlFor="category">Categoria</label>
                    <select
                        name="category"
                        id="category"
                        className="p-2 outline-none border-1 border-black/20 rounded-lg w-80"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option disabled selected>
                            Selecione uma Opção
                        </option>
                        {categorys.map((category) => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="p-2 outline-none rounded-lg w-80 bg-green-500 text-white cursor-pointer"
                    >
                        Criar Tarefa
                    </button>
                </form>
            </div>
        </div>
    );
}
