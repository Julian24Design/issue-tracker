"use client"

import ErrorMsg from "@/app/ui/ErrorMsg"
import { createIssueSchema } from "@/app/validationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Heading, Section, TextField } from "@radix-ui/themes"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
})

type Inputs = z.infer<typeof createIssueSchema>

export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({ resolver: zodResolver(createIssueSchema) })

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
    // <Suspense fallback={null}>
    <Section>
      <Heading>New issue</Heading>
      <form className="space-y-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <TextField.Root
            placeholder="Title"
            {...register("title")}
          ></TextField.Root>
          <ErrorMsg>{errors.title?.message}</ErrorMsg>
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            defaultValue=""
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
    </Section>
    // </Suspense>
  )
}
