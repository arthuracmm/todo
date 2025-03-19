import { Calendar, ChevronDown, Search } from "lucide-react";

export function SearchBar() {
    return (
        <div className="flex w-full justify-between">
            <div className="flex items-center bg-white rounded-lg overflow-hidden">
                <input type="text" placeholder="Achar sua Tarefa" className="p-2 w-100 bg-white pl-4 outline-none" />
                <div className="flex h-[80%] w-0.5 bg-zinc-100" />
                <button className="flex items-center justify-center px-3">
                    <Search />
                </button>
            </div>

            <div className="flex items-center bg-white rounded-lg overflow-hidden gap-2 px-5">
                <Calendar className="text-green-500"/>
                <p>Fev - Mar 2025</p>
                <ChevronDown className="text-green-500"/>
            </div>
        </div>
    )
}