import { ChartNoAxesColumn } from "lucide-react";

export function Progress() {
    const percentage = 75;
    const strokeDasharray = 2 * Math.PI * 45;
    const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;

    return (
        <div className="flex flex-col justify-around items-center bg-green-600 rounded-lg p-4 text-white ">
            <div className="flex flex-col w-full items-center">
                <h1 className="font-bold text-3xl">Progresso</h1>
                <div className="flex relative mt-5">
                    <svg
                        className="transform rotate-90"
                        width="150"
                        height="150"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="rgba(255, 255, 255, 0.28)"
                            strokeWidth="4"
                            fill="none"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="white"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold">{percentage}<sup className="text-[18px]">%</sup></p>
                </div>
            </div>
            <div className="w-50 h-0.5 bg-white/40" />
            <div className="flex w-full justify-between">
                <div className="flex flex-col">
                    <p className="text-white text-xl font-bold">35<sup className="text-xs">%</sup></p>
                    <p>Na ultima semana</p>
                </div>
                <ChartNoAxesColumn size={50} className="text-orange-500"/>
            </div>
        </div>
    );
}
