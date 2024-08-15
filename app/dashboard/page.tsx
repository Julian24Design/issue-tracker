import { Container, Grid, Section } from '@radix-ui/themes'
import { Suspense } from 'react'
import SummarySkeleton from './SummarySkeleton'
import ChartSkeleton from './ChartSkeleton'
import LatestIssuesSkeleton from './LatestIssuesSkeleton'
import LatestIssues from './LatestIssues'
import Summary from './Summary'
import Chart from './Chart'

export const metadata = { title: 'Dashboard' }

export default function Dashboard() {
  return (
    <Container>
      <Section size='3'>
        <Grid gap='4' columns='3'>
          <Suspense fallback={<SummarySkeleton />}>
            <Summary />
          </Suspense>
        </Grid>
      </Section>
      <Grid gap='8' columns='2'>
        <Suspense fallback={<ChartSkeleton />}>
          <Chart />
        </Suspense>
        <Suspense fallback={<LatestIssuesSkeleton />}>
          <LatestIssues />
        </Suspense>
      </Grid>
    </Container>
  )
}
