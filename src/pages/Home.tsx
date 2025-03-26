import { MonthsChart } from "@/components/MonthsChart";
import { RecentsTasks } from "../components/RecentsTasks";
import { SearchBar } from "../components/SearchBar";
import { SideBarLeft } from "../components/SideBarLeft";
import { SideBarRight } from "../components/SideBarRight";
import { Progress } from "../components/Progress";
import { LastWeek } from "@/components/LastWeek";
import { Welcome } from "@/components/Welcome";
import { NewTask } from "@/components/NewTask";
import { useState } from "react";

export function Home (){
    const [isTaskVisible, setIsTaskVisible] = useState(false);
    
      const showTaskModal = () => {
        setIsTaskVisible(true);
      };
    
      const hideTaskModal = () => {
        setIsTaskVisible(false);
      };
    return(
        <div className="font-outfit flex flex-1 w-full h-full bg-zinc-200">
            <NewTask isVisible={isTaskVisible} hideTaskModal={hideTaskModal} />
            <SideBarLeft showTaskModal={showTaskModal} />
            <div className="flex flex-col ml-50 mr-70 h-screen overflow-auto box-border py-4 px-8 gap-4 justify-around">
                <SearchBar/>
                <RecentsTasks />
                <div className="flex w-full justify-between gap-4">
                    <MonthsChart />
                    <Progress/>
                    <LastWeek />
                </div>
                <Welcome />
            </div>
            <SideBarRight />
        </div>
    )
}