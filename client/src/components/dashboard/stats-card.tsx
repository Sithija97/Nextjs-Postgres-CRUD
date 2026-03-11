import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardData {
  id: string;
  title: string;
  value: string;
  change: number;
  note: string;
}

interface StatsCardProps {
  stat: StatCardData;
}

export function StatsCard({ stat }: StatsCardProps) {
  const isPositive = stat.change >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-3xl font-semibold tracking-tight">
              {stat.value}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{stat.note}</p>
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              isPositive
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-500/15 text-rose-700 dark:text-rose-300",
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {Math.abs(stat.change)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
