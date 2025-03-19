import { Award, ChevronRight, Ellipsis, Mail, User } from "lucide-react";

export function SideBarRight() {
    return (
        <div className="flex flex-col fixed right-0 top-0 h-full w-70 bg-white
         p-4 justify-between">
            <div className="flex flex-col w-full items-center gap-4">
                <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col">
                        <p className="font-bold">Meu perfil</p>
                        <p className="font-light text-zinc-600 text-sm">Seu perfil está <span className="text-green-500 font-semibold">00%</span> completo</p>
                    </div>
                    <Ellipsis className="text-zinc-600" />
                </div>
            </div>
            <div className="flex flex-col w-full items-center gap-8">
                <div className="flex flex-col">
                    <img src="https://rseat.pics/" alt="a" className="size-30 object-cover rounded-full" />
                    <h1 className="font-bold mt-2">Nome do usuario</h1>
                    <p className="font-light text-zinc-600 text-sm">usuario@gmail.com</p>
                </div>

                <div className="flex bg-zinc-100 rounded-lg p-2 justify-between w-full items-center">
                    <div className="flex gap-2 w-25">
                        <Award className="box-border size-10 p-2 rounded-full bg-white text-red-500" />
                        <div className="flex flex-col w-fit truncate">
                            <p className="font-bold">15</p>
                            <p className="font-light truncate text-sm">Conquistas</p>
                        </div>
                    </div>
                    <div className="w-0.5 h-[80%] bg-zinc-200"></div>
                    <div className="flex gap-2 w-25">
                        <User className="box-border size-10 p-2 rounded-full bg-white text-green-500" />
                        <div className="flex flex-col">
                            <p className="font-bold">2</p>
                            <p className="font-light     truncate text-sm">Times</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">

                <div className="flex w-full justify-between">
                    <h1 className="font-bold">Próximas Tarefas</h1>
                    <span className="text-green-500 underline underline-offset-2 cursor-pointer">Ver Tudo</span>
                </div>

                <div className="flex gap-2 w-full">
                    <img src="https://rseat.pics/" alt="a" className="size-10 object-cover rounded-full" />
                    <div className="flex flex-col w-full">
                        <h1 className="w-[90%] truncate font-semibold">Ligação para o Gabriel Antônio</h1>
                        <p className="text-xs text-gray-500 w-full justify-center items-center">25, Março 2025 ● 9 AM - 11 AM</p>
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <img src="https://rseat.pics/" alt="a" className="size-10 object-cover rounded-full" />
                    <div className="flex flex-col w-full">
                        <h1 className="w-[90%] truncate font-semibold">Ligação para o Gabriel Antônio</h1>
                        <p className="text-xs text-gray-500 w-full justify-center items-center">25, Março 2025 ● 9 AM - 11 AM</p>
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <img src="https://rseat.pics/" alt="a" className="size-10 object-cover rounded-full" />
                    <div className="flex flex-col w-full">
                        <h1 className="w-[90%] truncate font-semibold">Ligação para o Gabriel Antônio</h1>
                        <p className="text-xs text-gray-500 w-full justify-center items-center">25, Março 2025 ● 9 AM - 11 AM</p>
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <img src="https://rseat.pics/" alt="a" className="size-10 object-cover rounded-full" />
                    <div className="flex flex-col w-full">
                        <h1 className="w-[90%] truncate font-semibold">Ligação para o Gabriel Antônio</h1>
                        <p className="text-xs text-gray-500 w-full justify-center items-center">25, Março 2025 ● 9 AM - 11 AM</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <h1 className="font-semibold">Convites</h1>
                    <p className="font-light text-zinc-600 text-sm">Você tem <span className="text-green-500 font-semibold">6 convites</span> para projetos</p>
                </div>
                <div className="flex bg-zinc-100 w-full p-2 rounded-lg justify-between items-center">
                    <Mail className="text-green-500" />
                    <div className="flex flex-col">
                        <p className="font-semibold text-lg">Arthur Cesar</p>
                        <p className="text-sm">Arthur convidou você</p>
                    </div>
                    <ChevronRight className="text-green-500" />
                </div>
            </div>

        </div>
    )
}