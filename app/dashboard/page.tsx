import {
  Avatar,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Separator,
  Text,
} from '@radix-ui/themes'
import { StatusBadge } from '@/app/ui'
import IssueChart from './IssueChart'

export default function Dashboard() {
  return (
    <Container>
      <Section size='3'>{renderSummary()}</Section>
      <Grid gap='4' columns='2'>
        <IssueChart />
        {renderLatestIssues()}
      </Grid>
    </Container>
  )

  function renderSummary() {
    return (
      <Grid gap='4' columns='3'>
        {[...Array(3)].map((_, i) => (
          <Card key={i} size='2'>
            <Heading size='2' mb='4' color='gray'>
              Open Issues
            </Heading>
            <Box py='4'>
              <Text as='p' size='7' weight='bold' align='center'>
                23
              </Text>
            </Box>
          </Card>
        ))}
      </Grid>
    )
  }

  function renderLatestIssues() {
    return (
      <Box>
        <Heading size='4' mb='6'>
          Lastes Issues
        </Heading>
        <Box>
          {[...Array(5)].map((_, i) => (
            <>
              <Flex justify='between' align='center'>
                <Box>
                  <Text as='p' weight='medium' size='2' mb='2'>
                    Users can not log in to the home page
                  </Text>
                  <StatusBadge status='CLOSED' />
                </Box>
                <Avatar src='/sss' fallback='?' radius='full' size='2' />
              </Flex>
              {i < 4 && <Separator size='4' my='4' />}
            </>
          ))}
        </Box>
      </Box>
    )
  }
}
