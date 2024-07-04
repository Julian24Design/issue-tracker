"use client"

import { TrashIcon } from "@radix-ui/react-icons"
import { AlertDialog, Box, Button, Flex } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function DeleteBtn({ issueId }: { issueId: number }) {
  const [isDeleting, setDeleting] = useState(false)
  const [isError, setError] = useState(false)
  const router = useRouter()
  const deleteIssue = async () => {
    try {
      setDeleting(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await axios.delete(`/api/issues1/${issueId}`)
      router.push("/issues")
      router.refresh()
      toast.success("Issue deleted.")
    } catch (error) {
      setError(true)
      setDeleting(false)
      console.log(error)
      // toast.error("Something went wrong, pleas try again later.")
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            variant="soft"
            className="hover:cursor-pointer"
            disabled={isDeleting}
            loading={isDeleting}
          >
            <TrashIcon />
            Delete
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This action cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                className="hover:cursor-pointer"
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                className="hover:cursor-pointer"
                onClick={deleteIssue}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

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
    </>
  )
}
