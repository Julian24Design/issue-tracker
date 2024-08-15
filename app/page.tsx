import { Container, Flex, Heading } from '@radix-ui/themes'
import HomeActions from './components/HomeActions'
import { auth } from '@/auth'

export default async function Home() {
  const session = await auth()

  return (
    <Container>
      <Flex direction='column' align='center' justify='center' gap='6' height='70vh'>
        <div className='w-48 aspect-square rounded-full bg-gradient-to-r from-purple-500 to-pink-500'></div>
        <Heading size='9' align='center' className='leading-tight'>
          Introducing the best <br /> issue tracker
        </Heading>
        <HomeActions session={session} />
      </Flex>
    </Container>
  )
}
