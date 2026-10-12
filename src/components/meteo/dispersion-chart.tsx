import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { phaseSpeed, type JetId, type Jets } from "@/lib/meteo/physics";

type Props = { jets: Jets; id: JetId; month: number };

export function DispersionChart({ jets, id, month }: Props) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const jet = jets[id];
  const data = Array.from({ length: 8 }, (_, index) => {
    const n = index + 2;
    return { n, c: Math.round(phaseSpeed({ ...jet, wave: n }, id, month)) };
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="h-44 w-full text-primary">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="n"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                stroke="var(--color-border)"
                tickLine={false}
                label={{ value: "bølgetall", position: "insideBottom", offset: -2, fill: "var(--color-muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                tick={false}
                label={{ value: "↑ østover · vestover ↓", angle: -90, position: "insideLeft", fill: "var(--color-muted-foreground)", fontSize: 11 }}
                stroke="var(--color-border)"
                tickLine={false}
                width={36}
                unit=""
              />
              <ReferenceLine y={0} stroke="var(--color-muted-foreground)" strokeDasharray="3 3" />
              <ReferenceLine x={jet.wave} stroke="var(--color-primary)" strokeDasharray="4 3" />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  color: "var(--color-foreground)",
                }}
                formatter={(value) => [Number(value) > 0 ? "østover" : Number(value) < 0 ? "vestover" : "står stille", "bølgemønsteret driver"]}
                labelFormatter={(label) => `Bølgetall ${label}`}
              />
              <Line type="monotone" dataKey="c" stroke="currentColor" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : null}
      </div>
    </div>
  );
}
