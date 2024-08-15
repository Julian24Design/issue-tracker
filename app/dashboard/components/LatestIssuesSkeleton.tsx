import { Avatar, Box, Flex, Text, Heading, Separator, Skeleton } from '@radix-ui/themes'
import React from 'react'

export default function LatestIssuesSkeleton() {
  return (
    <Box>
      <Heading size='4' mb='6'>
        <Skeleton>Lastes Issues</Skeleton>
      </Heading>
      <Box>
        {[...Array(5)].map((_, i) => (
          <React.Fragment key={i}>
            <Flex justify='between' align='center'>
              <Box>
                <Text as='p' weight='medium' size='2' mb='2'>
                  <Skeleton>
                    Lorem Ipsum is simply text of the printing and typesetting industry.
                  </Skeleton>
                </Text>
                <Skeleton width='70px' height='14px' />
              </Box>
              <Skeleton>
                <Avatar src='' fallback='?' radius='full' size='2' />
              </Skeleton>
            </Flex>
            {i < 4 && <Separator size='4' my='4' className='opacity-0' />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}
