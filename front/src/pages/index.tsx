import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Button, Flex, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import api from '@/services/api'
import jwt from 'jsonwebtoken'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const toast = useToast()
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const showToast = (message: string, color: string) => {
    return (toast({
      position: "bottom-right",
      render: () => {
        return (
          <Box color={"black"} p={6} bg={color} borderRadius={10} fontSize={15}>
            {message}
          </Box>
        )
      }
    }))
  }

  const onSubmit = (data: any) => {
    api.post('/login', data)
      .then(res => {
        localStorage.setItem('userData', res.data)
        router.push('/clients')
      }
      )
      .catch(function (error) {
        showToast(error.response.data.message, "red.500")
        console.log(error)
      })
  }

  function handleClick() {
    router.push('/register')
  }

  return (
    <>
      <Flex width={'100%'} h={'100vh'} alignItems={'center'} justifyContent={'center'}>
        <Box width={'600px'} backgroundColor={'gray.700'} p={[3, 5, 10]} borderRadius={5} m={[3, 5, 10]}>
          <Heading mb={10}>Login</Heading>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Text mb={3} fontWeight={500}>Email</Text>
            {errors.email?.type === 'required' && <Text fontSize={10} color={'red.400'}>Email is required</Text>}
            <Input type='email' backgroundColor={'gray.400'} mt={1} mb={5} placeholder='Email' color={'black'} _placeholder={{ color: 'gray.600' }} {...register('email', { required: true })} />
            <Text mb={3} fontWeight={500}>Password</Text>
            {errors.password?.type === 'required' && <Text fontSize={10} color={'red.400'}>Password is required</Text>}
            <Input type='password' backgroundColor={'gray.400'} mt={1} mb={5} placeholder='Password' color={'black'} _placeholder={{ color: 'gray.600' }} {...register('password', { required: true })} />
            <Flex w={'100%'} alignItems={'center'} justifyContent={'center'}>
              <Button type='submit' w={'150px'} h={'40px'} mr={5} backgroundColor={'green.700'} _hover={{ bgColor: 'green.400' }}>Logar</Button>
              <Button onClick={handleClick}>Cadastrar</Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </>
  )
}
