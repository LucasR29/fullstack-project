import api from "@/services/api";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const toast = useToast()

    const router = useRouter()

    function handleClick() {
        router.push('/')
    }

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
        api.post('/clients', data)
            .catch(function (error) {
                showToast(error.response.data.message, "red.500")
                console.log(error)
            })
            .then(res => {
                if (res !== undefined) {
                    console.log(res)
                    showToast('User created, redirecting', 'green.500')
                    setTimeout(() => {
                        router.push('/')
                    }, 1000)
                }
            }
            )
    }

    return (
        <Flex width={'100%'} h={'100vh'} alignItems={'center'} justifyContent={'center'}>
            <Box width={'600px'} backgroundColor={'gray.700'} p={[3, 5, 10]} borderRadius={5} m={[3, 5, 10]}>
                <Heading mb={10}>Register</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel htmlFor="fullName" marginTop={3}>Full Name</FormLabel>
                        {errors.full_name?.type === 'required' && <Text fontSize={10} color={'red.400'}>Full Name is required</Text>}
                        <Input backgroundColor={'gray.400'} mt={1} mb={5} placeholder='Maykon Parker' color={'black'} _placeholder={{ color: 'gray.600' }} id="fullName" {...register("full_name", { required: true })} />

                        <FormLabel htmlFor="email" marginTop={3}>Email</FormLabel>
                        {errors.email?.type === 'required' && <Text fontSize={10} color={'red.400'}>Email is required</Text>}
                        <Input backgroundColor={'gray.400'} mt={1} mb={5} placeholder='example@mail.com' color={'black'} _placeholder={{ color: 'gray.600' }} id="email" type={"email"} {...register("email", { required: true })} />

                        <FormLabel htmlFor="password">Password</FormLabel>
                        {errors.password?.type === 'required' && <Text fontSize={10} color={'red.400'}>Password is required</Text>}
                        {errors.password?.type === 'minLength' && <Text fontSize={10} color={'red.400'}>Min Length is 8</Text>}
                        <Input id="password" type='password' backgroundColor={'gray.400'} mb={5} mt={1} placeholder='The harder the better' color={'black'} _placeholder={{ color: 'gray.600' }} {...register('password', { required: true, minLength: 8 })} />

                        <FormLabel htmlFor="tel" marginTop={3}>Phone Number</FormLabel>
                        {errors.phone_number?.type === 'maxLength' && <Text fontSize={10} color={'red.400'}>Max Length is 15</Text>}
                        {errors.phone_number?.type === 'required' && <Text fontSize={10} color={'red.400'}>Phone Number is required</Text>}
                        {errors.phone_number?.type === 'minLength' && <Text fontSize={10} color={'red.400'}>Min Length is 9</Text>}
                        <Input backgroundColor={'gray.400'} mt={1} mb={5} placeholder='(99)999-999-999' color={'black'} _placeholder={{ color: 'gray.600' }} id="tel" type="number" {...register("phone_number", { required: true, minLength: 9, maxLength: 15 })} />
                    </FormControl>
                    <Flex w={'100%'} alignItems={'center'} justifyContent={'center'}>
                        <Button type='submit' w={'150px'} h={'40px'} mr={5} backgroundColor={'green.700'} _hover={{ bgColor: 'green.400' }}>Logar</Button>
                        <Button onClick={handleClick}>Login</Button>
                    </Flex>
                </form>
            </Box>
        </Flex>
    )
}