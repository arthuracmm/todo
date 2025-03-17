import { SideBarLeft } from "../components/SideBarLeft";
import { SideBarRight } from "../components/SideBarRight";

export function Home (){
    return(
        <div className="font-outfit flex flex-1 w-full h-full bg-zinc-200">
            <SideBarLeft />
            <div className="flex flex-1 ml-50 h-screen overflow-y-scroll box-border py-4 px-8">
                home
            </div>
            <SideBarRight />
        </div>
    )
}