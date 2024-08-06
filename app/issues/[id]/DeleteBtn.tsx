"use client"

import ErrorAlert from "@/app/ui/ErrorAlert"
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
      await axios.delete(`/api/issues/${issueId}`)
      router.push("/issues")
      router.refresh()
      toast.success("Issue deleted.")
    } catch (error) {
      setError(true)
      setDeleting(false)
      console.log(error)
    }
  }

  return (
    <>
      <ErrorAlert isError={isError} setError={setError} />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="soft" disabled={isDeleting} loading={isDeleting}>
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
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
