import prisma from '@/prisma/client'
import { Box, Heading, Text, Flex, Avatar, Separator } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { StatusBadge } from '../../components'

export default async function LatestIssues() {
  const data = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assignedUser: true },
  })

  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <Box>
      <Heading size='4' mb='6'>
        Lastest Issues
      </Heading>
      <Box>
        {data.map((d, i) => (
          <React.Fragment key={i}>
            <Flex justify='between' align='center'>
              <Box>
                <Link href={'/issues/' + d.id} className='hover:underline'>
                  <Text as='p' weight='medium' size='2' mb='2'>
                    {d.title}
                  </Text>
                </Link>
                <StatusBadge status={d.status} />
              </Box>
              <Avatar src={d.assignedUser?.image!} fallback='?' radius='full' size='2' />
            </Flex>
            {i < 4 && <Separator size='4' my='4' />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}
