import { ChartNoAxesColumn } from "lucide-react";

export function LastWeek() {
  const ThisWeek = 40;
  const LastWeek = 75;

  const ColorCharts = (week: number) =>{
    if (week <= 40){
      return "text-red-500"
    } else if(week >= 75){
      return "text-green-500"
    } else {
      return "text-orange-500"
    }
  }

  return (
    <div className="flex flex-col w-150 h-full items-center gap-4">
      <h1 className="flex w-full bg-white p-2 rounded-lg font-semibold justify-center text-3xl">Tarefas Completas</h1>
      <div className="flex gap-1 w-full text-start bg-white p-4 px-8 rounded-lg h-full justify-between items-center">
        <div className="flex flex-col">
          <p className="text-6xl font-semibold">{ThisWeek}<sup className="text-[35px]">%</sup></p>
          <p className="text-sm text-zinc-400">Essa semana</p>
        </div>
        <ChartNoAxesColumn size={50} className={`${ColorCharts(ThisWeek)}`}/>
      </div>
      <div className="w-[80%] h-0.5 bg-zinc-300" />
      <div className="flex gap-1 w-full text-start bg-white p-4 px-8 rounded-lg h-full justify-between items-center">
        <div className="flex flex-col">
          <p className="text-6xl font-semibold">{LastWeek}<sup className="text-[35px]">%</sup></p>
          <p className="text-sm text-zinc-400">Ultima semana</p>
        </div>
        <ChartNoAxesColumn size={50} className={`${ColorCharts(LastWeek)}`}/>
      </div>
    </div>
  );
}
