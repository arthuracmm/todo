import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import axios from "axios"
import { useState, useEffect } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  tarefas: {
    label: "Tarefas",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function MonthsChart() {
  const [chartData, setchartData] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tarefasmes')
      .then(response => {
        setchartData(response.data.slice(0, 6));
      })
      .catch(error => {
        console.error("Erro ao carregar tarefas:", error);
      });
  }, []);
  return (
    <Card className="border-none bg-white w-150 rounded-lg">
      <CardHeader>
        <CardTitle>Atividade</CardTitle>
        <CardDescription>Março - Abril - 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="tarefas"
              type="natural"
              stroke="oklch(0.723 0.219 149.579)"
              strokeWidth={1}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
