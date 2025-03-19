import { Circle, CircleCheck } from 'lucide-react';
import db from '../../public/db/db.json'
import { useState } from 'react';

export function RecentsTasks() {
    const data = db.tarefas

    const OrderedData = data.sort((a, b) => {
        const dataA = new Date(a.due_date).getTime();
        const dataB = new Date(b.due_date).getTime();
        return dataB - dataA;
    });

    const formatarData = (data: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
        return new Date(data).toLocaleDateString('pt-BR', options).replace('/', '/');
    };

    const [completedTasks, setCompletedTasks] = useState<{ [key: number]: boolean }>({});

    const toggleTaskCompletion = (taskId: number) => {
        setCompletedTasks((prevState) => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
    };


    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Ultimas Tarefas Criadas</h1>
            <div className="flex w-30 h-0.5 rounded-full bg-green-500 mt-1" />
            <div className="flex flex-col gap-2">
                {OrderedData.map((task) => (
                    <div className="flex p-2 bg-white w-fit gap-2 rounded-lg">
                        <p
                            className={`${
                                completedTasks[task.id] ? 'line-through text-gray-500' : ''
                            }`}
                        >
                            {task.title}
                        </p>
                        <button onClick={() => toggleTaskCompletion(task.id)}>
                            {completedTasks[task.id] ? (
                                <CircleCheck className="text-green-500" />
                            ) : (
                                <Circle />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}