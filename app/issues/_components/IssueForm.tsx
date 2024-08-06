"use client"

import { ErrorMsg } from "@/app/ui"
import { IssueSchema } from "@/app/validationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issue } from "@prisma/client"
import { Button, TextField } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useState } from "react"
import ErrorAlert from "@/app/ui/ErrorAlert"

type Inputs = z.infer<typeof IssueSchema>

export default function IssueForm({ issue }: { issue?: Issue }) {
  const [isError, setError] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({ resolver: zodResolver(IssueSchema) })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data)
        router.push(`/issues/${issue.id}`)
        router.refresh()
        toast.success("Issue updated.")
      } else {
        await axios.post("/api/issues", data)
        router.push("/issues")
        router.refresh()
        toast.success("New issue added.")
      }
    } catch (error) {
      setError(true)
    }
  }

  return (
    <>
      <ErrorAlert isError={isError} setError={setError} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 mb-6">
          <TextField.Root
            placeholder="Title"
            defaultValue={issue?.title}
            {...register("title")}
          ></TextField.Root>
          <ErrorMsg>{errors.title?.message}</ErrorMsg>
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          ></Controller>
          <ErrorMsg>{errors.description?.message}</ErrorMsg>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          mt={errors.description ? "5" : "0"}
        >
          {issue ? "Update" : "Submit"}
        </Button>
      </form>
    </>
  )
}
