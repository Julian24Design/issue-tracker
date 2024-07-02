import IssueForm from "@/app/issues/_components/IssueForm"
import { Heading, Section } from "@radix-ui/themes"

export default function NewIssue() {
  return (
    <Section>
      <Heading>New issue</Heading>
      <IssueForm />
    </Section>
  )
}
