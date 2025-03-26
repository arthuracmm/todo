import { NewTask } from "@/components/NewTask";
import { SideBarLeft } from "@/components/SideBarLeft";
import { SideBarRight } from "@/components/SideBarRight";
import { Welcome } from "@/components/Welcome";
import axios from "axios";
import { Calendar, ChevronDown, ChevronUp, Circle, CircleCheck, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { House, Briefcase, Notebook, HeartPulse } from "lucide-react";

type Task = {
    id: string;
    title: string;
    due_date: string;
    status: string;
    priority: string;
    category: string
};

type Category = {
    id: string;
    name: string;
    icon: string
};

export function Pendentes() {
    const [isTaskVisible, setIsTaskVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [orderedAB, setOrderedAB] = useState<boolean>(false);

    const showTaskModal = () => {
        setIsTaskVisible(true);
    };

    const hideTaskModal = () => {
        setIsTaskVisible(false);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/tarefas')
            .then(response => {
                const orderedTasks = [...response.data].sort((a, b) => {
                    const dataA = new Date(a.due_date).getTime();
                    const dataB = new Date(b.due_date).getTime();
                    return orderedAB ? dataB - dataA : dataA - dataB;
                });
                setTasks(orderedTasks);
            })
            .catch(error => {
                console.error("Erro ao carregar tarefas:", error);
            });
    }, [orderedAB]);

    useEffect(() => {
        axios.get('http://localhost:5000/categorias')
            .then(response => {
                setCategorys(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar categorias:", error);
            });
    }, []);

    const toggleTaskCompletion = (taskId: string) => {
        setTasks((prevState) => {
            const updatedTasks = prevState.map((task) => {
                if (task.id === taskId) {
                    const updatedStatus: 'pending' | 'completed' = task.status === 'pending' ? 'completed' : 'pending';
                    return { ...task, status: updatedStatus };
                }
                return task;
            });
            return updatedTasks;
        });

        const taskToUpdate = tasks.find(task => task.id === taskId);
        if (taskToUpdate) {
            axios.put(`http://localhost:5000/tarefas/${taskId}`, {
                ...taskToUpdate,
                status: taskToUpdate.status === 'pending' ? 'completed' : 'pending'
            })
                .catch(error => {
                    console.error("Erro ao atualizar status:", error);
                });
        }
    };

    const taskDelete = (taskId: string) => {
        if (window.confirm('Tem certeza que deseja deletar essa tarefa?')) {
            axios.delete(`http://localhost:5000/tarefas/${taskId}`)
            console.log('Tarefa deletada com sucesso')
        } else {
            console.log('Tarefa nao deletada')
        }
    }

    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case "House":
                return <House />;
            case "Briefcase":
                return <Briefcase />;
            case "Notebook":
                return <Notebook />;
            case "HeartPulse":
                return <HeartPulse />;
            default:
                return null;
        }
    };

    const handleButtonClick = () => {
        setOrderedAB(prevState => !prevState);  // Alterna entre verdadeiro e falso
    };

    return (
        <div className="font-outfit flex bg-zinc-200">
            <NewTask isVisible={isTaskVisible} hideTaskModal={hideTaskModal} />
            <SideBarLeft showTaskModal={showTaskModal} />
            <div className="flex flex-col flex-1 ml-50 mr-70 h-full box-border py-4 px-8 gap-4">
                <Welcome />
                <div className="flex flex-col w-full h-full ">
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold">Proximas Tarefas</h1>
                            <div className="flex w-30 h-0.5 rounded-full bg-green-500" />
                        </div>
                        <div className="flex gap-2 cursor-pointer">
                            {orderedAB === false ? (
                                <div className="flex bg-white rounded-lg px-2 items-center">
                                    <button onClick={() => handleButtonClick()} className="cursor-pointer">
                                        Crescente
                                    </button>
                                    <ChevronUp />
                                </div>
                            ) : (
                                <div className="flex bg-white rounded-lg px-2 items-center">
                                    <button onClick={() => handleButtonClick()} className="cursor-pointer">
                                        Decrescente
                                    </button>
                                    <ChevronDown />
                                </div>
                            )}
                            <button className="bg-white rounded-lg px-2 cursor-pointer">
                                Limpar Filtros
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full rounded-lg mt-3 gap-4">
                        {categorys.map((category) => (
                            <div key={category.name} className="flex flex-col gap-2 ">
                                <div className="flex flex-col w-fit rounded-lg text-xl font-semibold">
                                    <div className="flex gap-2">
                                        {getIconComponent(category.icon)}
                                        <p>{category.name}</p>
                                    </div>
                                    <div className="flex w-10 h-0.5 rounded-full bg-green-500" />
                                </div>
                                {tasks.filter((task: Task) => task.category === category.name).map((task: Task) => {
                                    const dueDate = new Date(task.due_date);

                                    const day = dueDate.getDate();
                                    const monthYear = dueDate.toLocaleString('default', { month: 'numeric', year: "2-digit" });
                                    const hours = dueDate.getHours();
                                    const minutes = dueDate.getMinutes();
                                    const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

                                    return (
                                        <div className={`${task.status === 'completed' ? 'opacity-50 bg-zinc-300' : 'bg-white'} flex p-2 justify-between rounded-lg items-center`} key={task.id}>
                                            <div className={`${task.status === 'completed' ? 'line-through text-zinc-500' : ''} flex flex-col`}>
                                                <p className='truncate text-xl font-semibold'>
                                                    {task.title}
                                                </p>
                                                <p className={`${task.priority === 'Alta' ? 'bg-red-500' : task.priority === 'Média' ? 'bg-yellow-500' : 'bg-green-500'} w-fit px-2 rounded-md text-[10px] text-white`}>
                                                    {task.priority}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 h-full w-fit items-center">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex bg-zinc-100 p-1 rounded-lg gap-2">
                                                        <Calendar className="flex" />
                                                        <p>{`${day}/${monthYear}`}</p>
                                                    </div>
                                                    <div className="flex bg-zinc-100 p-1 rounded-lg gap-2">
                                                        <Clock className="flex" />
                                                        <p>{time}</p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <button>
                                                        {task.status === 'completed' ? (
                                                            <button className="flex gap-1" onClick={() => toggleTaskCompletion(task.id)}>
                                                                <CircleCheck className="text-green-500" />
                                                                <p className="w-20">Completo</p>
                                                            </button>
                                                        ) : (
                                                            <button className="flex gap-1" onClick={() => toggleTaskCompletion(task.id)}>
                                                                <Circle />
                                                                <p className="w-20">Pendente</p>
                                                            </button>
                                                        )}
                                                    </button>
                                                    <p>
                                                    </p>
                                                </div>

                                                <button className="flex bg-red-500 p-2 text-white rounded-md items-center aspect-square h-full w-full cursor-pointer"
                                                    onClick={() => taskDelete(task.id)}>
                                                    <X />
                                                </button>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <SideBarRight />
        </div>
    )
}