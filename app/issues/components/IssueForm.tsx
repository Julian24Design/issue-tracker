'use client'

import { useState } from 'react'
import { ErrorMsg, ErrorAlert } from '@/app/components'
import { IssueSchema } from '@/app/lib/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Skeleton, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
// Disable SSR on client component to prevent ReferrenceError of browser APIs
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <Skeleton height='370px' mb='6' />,
})

type Inputs = z.infer<typeof IssueSchema>

export default function IssueForm({ issue }: { issue?: Issue }) {
  const [isError, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ title: '', desc: '' })

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
        toast.success('Issue updated.')
      } else {
        await axios.post('/api/issues', data)
        router.push('/issues')
        router.refresh()
        toast.success('New issue added.')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        setErrorMsg({
          title: error.response.data,
          desc: error.response.status + ' ' + error.response.statusText,
        })
      setError(true)
    }
  }

  return (
    <>
      <ErrorAlert isError={isError} setError={setError} errorMsg={errorMsg} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-3 mb-6'>
          <TextField.Root
            placeholder='Title'
            defaultValue={issue?.title}
            {...register('title')}
          ></TextField.Root>
          <ErrorMsg>{errors.title?.message}</ErrorMsg>
        </div>
        <div>
          <Controller
            name='description'
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
          ></Controller>
          <ErrorMsg>{errors.description?.message}</ErrorMsg>
        </div>
        <Button
          type='submit'
          disabled={isSubmitting}
          loading={isSubmitting}
          mt={errors.description ? '5' : '0'}
        >
          {issue ? 'Update' : 'Submit'}
        </Button>
      </form>
    </>
  )
}
