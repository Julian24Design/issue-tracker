import { Skeleton } from '@radix-ui/themes'

export default function ChartSkeleton() {
  return (
    <div className='h-full w-full flex flex-col gap-16 justify-center items-center'>
      <Skeleton height='240px' width='240px' className='rounded-full' />
      <Skeleton height='18px' width='250px' />
    </div>
  )
}
