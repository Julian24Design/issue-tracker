import { Box, Skeleton } from "@radix-ui/themes"

export default function IssueFormLoading() {
  return (
    <Box className="space-y-6">
      <Skeleton height="32px" />
      <Skeleton height="370px" />
    </Box>
  )
}
