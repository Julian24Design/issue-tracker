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

type Inputs = z.infer<typeof IssueSchema>

export default function IssueForm({ issue }: { issue?: Issue }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({ resolver: zodResolver(IssueSchema) })

  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000))
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
      toast.error("Something went wrong, please try again later.")
    }
  }

  return (
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
      <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
        Submit
      </Button>
    </form>
  )
}
