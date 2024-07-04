import { Section, Flex, Skeleton } from "@radix-ui/themes"

export default function IssueDetailLoading() {
  return (
    <Section>
      <Flex justify="between" align="center">
        <Skeleton width="300px" height="32px" />
        <Skeleton width="112px" height="32px" />
      </Flex>
      <Flex gap="4" my="5" align="center">
        <Skeleton width="60px" height="20px" />
        <Skeleton width="160px" height="20px" />
      </Flex>
      <Skeleton height="400px" />
    </Section>
  )
}
