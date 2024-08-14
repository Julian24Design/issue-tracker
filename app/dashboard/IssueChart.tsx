'use client'

import { PieChart } from '@mui/x-charts'

export default function IssueChart() {
  return (
    <PieChart
      series={[
        {
          data: [
            { value: 50, label: 'Open' },
            { value: 30, label: 'In Progress' },
            { value: 20, label: 'Closed' },
          ],
          innerRadius: 80,
          outerRadius: 120,
          paddingAngle: 3,
          cornerRadius: 3,
          cx: '58%',
        },
      ]}
      margin={{ bottom: 70 }}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 40,
          itemGap: 20,
          markGap: 8,
          itemMarkHeight: 12,
          itemMarkWidth: 12,
          labelStyle: { fontSize: 14 },
        },
      }}
    />
  )
}
