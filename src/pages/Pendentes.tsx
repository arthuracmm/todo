import { NewTask } from "@/components/NewTask";
import { SideBarLeft } from "@/components/SideBarLeft";
import { SideBarRight } from "@/components/SideBarRight";
import { Welcome } from "@/components/Welcome";
import axios from "axios";
import { Calendar, Circle, CircleCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";

type Task = {
    id: string;
    title: string;
    due_date: string;
    status: string;
    priority: string
};

export function Pendentes() {
    const [isTaskVisible, setIsTaskVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    const showTaskModal = () => {
        setIsTaskVisible(true);
    };

    const hideTaskModal = () => {
        setIsTaskVisible(false);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/tarefas')
            .then(response => {
                const orderedTasks = response.data.sort((a: Task, b: Task) => {
                    const dataA = new Date(a.due_date).getTime();
                    const dataB = new Date(b.due_date).getTime();
                    return dataA - dataB;
                });
                setTasks(orderedTasks);
            })
            .catch(error => {
                console.error("Erro ao carregar tarefas:", error);
            });
    }, []);

    return (
        <div className="font-outfit flex bg-zinc-200">
            <NewTask isVisible={isTaskVisible} hideTaskModal={hideTaskModal} />
            <SideBarLeft showTaskModal={showTaskModal} />
            <div className="flex flex-col flex-1 ml-50 mr-70 h-full box-border py-4 px-8 gap-4">
                <Welcome />
                <div className="flex flex-col w-full h-full ">
                    <h1 className="text-3xl font-bold">Proximas Tarefas</h1>
                    <div className="flex w-30 h-0.5 rounded-full bg-green-500" />
                    <div className="flex flex-col w-full h-full rounded-lg mt-2 gap-2">
                        {tasks.map((task) => {
                            const dueDate = new Date(task.due_date);

                            const day = dueDate.getDate();
                            const monthYear = dueDate.toLocaleString('default', { month: 'numeric', year: "2-digit" });
                            const hours = dueDate.getHours();
                            const minutes = dueDate.getMinutes();
                            const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

                            return (
                                <div className={`${task.status === 'completed' ? 'opacity-50 bg-zinc-300' : 'bg-white'} flex p-2 justify-between rounded-lg items-center`} key={task.id}>
                                    <div className={`${task.status === 'completed' ? 'line-through text-zinc-500' : ''} flex flex-col`}>
                                    <p className= 'truncate text-xl font-semibold'>
                                        {task.title}
                                    </p>
                                    <p className={`${task.priority === 'Alta' ? 'bg-red-500' : task.priority === 'Média' ? 'bg-yellow-500' : 'bg-green-500'} w-fit px-2 rounded-md text-[10px] text-white`}>
                                        {task.priority}
                                    </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex bg-zinc-100 p-1 rounded-lg gap-2">
                                                <Calendar className="flex"/>
                                                <p>{`${day}/${monthYear}`}</p>
                                            </div>
                                            <div className="flex bg-zinc-100 p-1 rounded-lg gap-2">
                                                <Clock className="flex"/>
                                                <p>{time}</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                {task.status === 'completed' ? (
                                                    <div className="flex gap-1">
                                                    <CircleCheck className="text-green-500" />
                                                    <p>Completo</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-1">
                                                    <Circle />
                                                    <p>Pendente</p>
                                                    </div>
                                                )}
                                            </button>
                                            <p>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <SideBarRight />
        </div>
    )
}