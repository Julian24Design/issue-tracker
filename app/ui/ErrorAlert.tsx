import { AlertDialog, Flex, Button } from "@radix-ui/themes"
import { Dispatch, SetStateAction } from "react"

export default function ErrorAlert({
  isError,
  setError,
}: {
  isError: boolean
  setError: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <AlertDialog.Root open={isError}>
      <AlertDialog.Content maxWidth="450px" align="center">
        <AlertDialog.Title>Something went wrong</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Please try again later.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              className="hover:cursor-pointer"
              onClick={() => setError(false)}
            >
              Got it
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
