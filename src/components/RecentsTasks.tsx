import axios from 'axios';
import { Circle, CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Task {
    id: string;
    title: string;
    due_date: string;
    status: 'pending' | 'completed';
  }

export function RecentsTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tarefas')
      .then(response => {
        const orderedTasks = response.data.sort((a: Task, b: Task) => {
          const dataA = new Date(a.due_date).getTime();
          const dataB = new Date(b.due_date).getTime();
          return dataB - dataA;
        });
        setTasks(orderedTasks);
      })
      .catch(error => {
        console.error("Erro ao carregar tarefas:", error);
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

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <h1 className="text-3xl font-bold">Proximas Tarefas</h1>
      <div className="flex w-30 h-0.5 rounded-full bg-green-500" />
      <div className="flex gap-2 overflow-x-hidden w-screen">
      {tasks.map((task) => (
          <div key={task.id} className="flex p-2 bg-white gap-2 rounded-lg">
            <p className={`${task.status === 'completed' ? 'line-through text-zinc-500' : ''} truncate`}>
              {task.title}
            </p>
            <button onClick={() => toggleTaskCompletion(task.id)}>
              {task.status === 'completed' ? (
                <CircleCheck className="text-green-500" />
              ) : (
                <Circle />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
