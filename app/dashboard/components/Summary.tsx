import { Card, Heading, Box, Text } from '@radix-ui/themes'
import { fetchSummary } from '@/app/lib/data'

export default async function Summary() {
  const { open, inProgress, closed } = await fetchSummary()
  const data = [
    { lable: 'Open', count: open },
    { lable: 'In-progress', count: inProgress },
    { lable: 'Closed', count: closed },
  ]

  await new Promise((resolve) => setTimeout(resolve, 1000))
  return (
    <>
      {data.map((d, i) => (
        <Card key={i} size='2'>
          <Heading size='2' mb='4' color='gray'>
            {d.lable}
          </Heading>
          <Box py='4'>
            <Text as='p' size='7' weight='bold' align='center'>
              {d.count}
            </Text>
          </Box>
        </Card>
      ))}
    </>
  )
}
