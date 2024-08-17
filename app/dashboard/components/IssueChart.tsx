'use client'

import { PieChart } from '@mui/x-charts'
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import { useTheme } from 'next-themes'

type Props = {
  data: { label: string; value: number }[]
}

export default function IssueChart({ data }: Props) {
  const { resolvedTheme } = useTheme()
  const theme = createTheme({ palette: { mode: resolvedTheme as PaletteMode } })

  return (
    <ThemeProvider theme={theme}>
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 90,
            outerRadius: 120,
            paddingAngle: 3,
            cornerRadius: 2,
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
    </ThemeProvider>
  )
}
