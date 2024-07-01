import { Section, Flex, Skeleton } from "@radix-ui/themes"

export default function IssueDetailLoading() {
  return (
    <Section>
      <Skeleton maxWidth="500px" height="30px" />
      <Flex gap="4" my="5" align="center">
        <Skeleton width="60px" height="20px" />
        <Skeleton width="160px" height="20px" />
      </Flex>
      <Skeleton height="260px" />
    </Section>
  )
}
