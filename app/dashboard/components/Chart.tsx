import { fetchSummary } from '@/app/lib/data'
import dynamic from 'next/dynamic'
import ChartSkeleton from './ChartSkeleton'
const IssueChart = dynamic(() => import('./IssueChart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
})

export default async function Chart() {
  const { open, inProgress, closed } = await fetchSummary()
  const data = [
    { label: 'Open', value: open, color: 'var(--orange-9)' },
    { label: 'In Progress', value: inProgress, color: 'var(--blue-9)' },
    { label: 'Closed', value: closed, color: 'var(--grass-9)' },
  ]

  await new Promise((resolve) => setTimeout(resolve, 1000))
  return <IssueChart data={data} />
}
