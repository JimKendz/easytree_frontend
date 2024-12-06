"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Tom",
    total: 1,
  },
  {
    name: "Mario",
    total: 2,
  },
  {
    name: "Daisy",
    total: 3,
  },
  {
    name: "Eric",
    total: 1,
  },
  {
    name: "Luigi",
    total: 2,
  },
  {
    name: "Max",
    total: 4,
  },
  {
    name: "Timbo",
    total: 1,
  },
  {
    name: "Anna",
    total: 2,
  },
]

export function TopParticipants() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12} // funktioniert trotz Fehler
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12} // funktioniert trotz Fehler
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} Wins`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}