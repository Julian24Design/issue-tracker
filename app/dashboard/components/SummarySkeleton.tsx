import { Skeleton } from '@radix-ui/themes'

export default function SummarySkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} height='134px' />
      ))}
    </>
  )
}
