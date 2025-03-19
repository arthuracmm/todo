import { MonthsChart } from "@/components/MonthsChart";
import { RecentsTasks } from "../components/RecentsTasks";
import { SearchBar } from "../components/SearchBar";
import { SideBarLeft } from "../components/SideBarLeft";
import { SideBarRight } from "../components/SideBarRight";
import { Progress } from "../components/Progress";
import { LastWeek } from "@/components/LastWeek";
import { Welcome } from "@/components/welcome";

export function Home (){
    return(
        <div className="font-outfit flex flex-1 w-full h-full bg-zinc-200">
            <SideBarLeft />
            <div className="flex flex-col flex-1 ml-50 mr-70 h-screen overflow-y-scroll box-border py-4 px-8 gap-4">
                <SearchBar/>
                <Welcome />
                <RecentsTasks />
                <div className="flex w-full justify-between gap-4">
                    <MonthsChart />
                    <Progress/>
                    <LastWeek />
                </div>
            </div>
            <SideBarRight />
        </div>
    )
}