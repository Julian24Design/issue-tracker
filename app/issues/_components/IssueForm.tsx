"use client"

import { ErrorMsg } from "@/app/ui"
import { TextField, Button } from "@radix-ui/themes"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { IssueSchema } from "@/app/validationSchema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issue } from "@prisma/client"
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
})

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
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await axios.post("/api/issues", data)
      router.push("/issues")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="space-y-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3">
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
