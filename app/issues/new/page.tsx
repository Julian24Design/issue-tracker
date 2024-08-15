import { Heading, Section } from '@radix-ui/themes'
import { IssueForm } from '@/app/issues/components'

export const metadata = { title: 'New issue' }

export default function NewIssue() {
  return (
    <Section>
      <Heading className='mb-10'>New issue</Heading>
      <IssueForm />
    </Section>
  )
}
