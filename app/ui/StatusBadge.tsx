import { Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes"
import React from "react"

const statusMap: Record<
  Status,
  { label: string; color: "orange" | "blue" | "grass" }
> = {
  OPEN: { label: "Open", color: "orange" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "grass" },
}

export default function StatusBadge({ status }: { status: Status }) {
  // let color: "orange" | "blue" | "grass"
  // switch (status) {
  //   case "OPEN":
  //     color = "orange"
  //     break
  //   case "IN_PROGRESS":
  //     color = "blue"
  //     break
  //   case "CLOSED":
  //     color = "grass"
  //     break
  // }
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}
