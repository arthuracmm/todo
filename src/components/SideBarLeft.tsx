import { CalendarSync, ChartLine, CheckCheck, ChevronDown, ClockAlert, Layers, LayoutDashboard, Plus, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
    {
        title: "Home",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Estatisticas",
        url: "/estatisticas",
        icon: ChartLine,
    },

    {
        title: "Pendentes",
        url: "/pendentes",
        icon: ClockAlert,
    },

    {
        title: "Concluidas",
        url: "/concluidas",
        icon: CheckCheck,
    },

    {
        title: "Categorias",
        url: "/categorias",
        icon: Layers,
    },

    {
        title: "Recorrentes",
        url: "/recorrentes",
        icon: CalendarSync,
    },

    {
        title: "Configurações",
        url: "/configuracoes",
        icon: Settings,
    },
]

const verifyPath = (path: string) => {
    return location.pathname === path
        ? 'text-green-500'
        : 'text-zinc-500';
}

export function SideBarLeft() {
    return (
        <div className="flex flex-col fixed left-0 top-0 h-full w-50 bg-white justify-between items-center p-4">
            <div className="flex flex-col justify-center items-center gap-8 w-fu">
                <div className="flex gap-2 items-center">
                    <h1 className="flex font-bold text-2xl bg-green-400 size-10 text-center rounded-full text-white items-center justify-center">T</h1>
                    <h1 className="font-bold text-2xl">ToDo.</h1>
                </div>
                <div className="flex bg-zinc-200 rounded-xl py-2 px-4 items-center shadow-lg justify-between">
                    <p className="w-20 text-sm">Criar <br />Nova Tarefa</p>
                    <Plus className="bg-green-500 text-white box-border rounded-full p-2 size-10 shadow-lg" />
                </div>
                <div className="flex flex-col gap-8">
                    {items.map((item) => (
                        <Link to={item.url} className="flex gap-2">
                            <item.icon className={`${verifyPath(item.url)}`} />
                            <p className={`font-semibold ${verifyPath(item.url)}`}>{item.title}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col flex-1">
                    <p>Horkspace</p>
                    <div className="flex bg-zinc-200 p-2 rounded-lg justify-between">
                        <p>Email.com</p>
                        <ChevronDown className="text-zinc-500" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <img className="flex font-bold text-2xl size-10 text-center rounded-full text-white items-center justify-center" src="https://rseat.pics/" />
                    <div className="flex flex-col">
                        <h1 className="text-md truncate font-semibold w-34">Nome do Usuarioaaaaaaa</h1>
                        <p className="text-xs truncate w-34">nomedousuario@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}