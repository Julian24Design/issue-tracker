import Link from 'next/link'
import { Button, Flex, Section } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import IssuesTableFilter from './IssuesTableFilter'
import IssuesTable, { IssueQuery } from './IssuesTable'

export const dynamic = 'force-dynamic'

export default async function IssuesPage({ searchParams }: { searchParams: IssueQuery }) {
  return (
    <Section>
      <Flex mb='6' justify='between'>
        <IssuesTableFilter />
        <Link href='/issues/new'>
          <Button>
            <PlusIcon />
            Add issue
          </Button>
        </Link>
      </Flex>
      <IssuesTable searchParams={searchParams} />
    </Section>
  )
}
