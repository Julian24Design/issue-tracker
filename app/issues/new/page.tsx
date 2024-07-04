import { Heading, Section } from "@radix-ui/themes"
import dynamic from "next/dynamic"
import IssueFormLoading from "@/app/issues/_components/IssueFormLoading"
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
})

export default function NewIssue() {
  return (
    <Section>
      <Heading className="mb-10">New issue</Heading>
      <IssueForm />
    </Section>
  )
}
