import api from "@/services/api"
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack,
    StackDivider,
    Box,
    SimpleGrid,
    Button,
    Modal,
    useDisclosure,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Input,
    FormControl,
    FormLabel,
    Flex,
    Text,
    useToast
} from "@chakra-ui/react"

import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import jwt from 'jsonwebtoken'

function Clients() {
    const router = useRouter()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isClient, setIsClient] = useState(false)
    const [isDel, setIsDel] = useState(false)
    const [userID, setUserID] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState<{ id: string, full_name: string, phone_number: string, email: string }>()
    const [contacts, setContacts] = useState<any[]>([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const refreshData = () => {
        router.replace(router.asPath)
    }

    const resetRefresh = () => {
        reset()
        refreshData()
        setIsClient(false)
        onClose()
        setIsEdit(false)
        handleScrollPosition()
    }

    const handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            sessionStorage.removeItem("scrollPosition");
        }
    };

    const handleClick = () => {
        sessionStorage.setItem("scrollPosition", String(window.pageXOffset));
    };

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

    const getContacts = async () => {
        const token = localStorage.getItem('userData')

        if (!token) {
            router.push('/')
            localStorage.clear()
        }

        const userData: { id: string } = jwt.decode(token as string) as { id: string }

        if (userData === null) {
            router.push('/')
            localStorage.clear()
        } else {
            if (userData === undefined || userData.id === undefined || userData.id === null) {
                router.push('/')
                localStorage.clear()
            }
        }

        const contacts: any = await api.get(`/contacts/${userData.id}`).catch((error) => { router.push('/'), localStorage.clear() })

        const user: any = await api.get(`/clients/${userData.id}`)

        setUser(user.data)

        setUserID(userData.id)

        setContacts(contacts.data)
    }

    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            router.push('/')
        } else {
            getContacts()
        }
    }, [])

    const disconect = () => {
        localStorage.clear()
        router.push('/')
    }

    const onSubmit = async (data: any) => {
        try {
            isEdit ?
                (
                    user!.id === userID ?
                        (
                            await api.patch(`/clients/${userID}`, data)
                        )
                        :
                        (

                            await api.patch(`/contacts/${userID}`, data)
                                .then((res: any) => {
                                    getContacts()
                                })
                        )
                )
                :
                (
                    await api.post(`/contacts/${userID}`, data)
                        .then((res: any) => {
                            setContacts([...contacts, res.data])
                        })
                )
        } catch (error: any) {
            showToast(error.response.data.message, "red.500")
        }

        resetRefresh()
    }

    const handleDelete = async (id: string, route: string) => {
        await api.delete(`/${route}/${id}`)
        if (route === 'clients') {
            localStorage.clear()
            router.push('/')
        }
        getContacts()
        resetRefresh()
    }

    return (
        <>
            <Flex margin={10} justifyContent={"space-between"} alignItems={"center"}>
                <Box display={'flex'} alignItems={"center"} gap={2}>
                    <Button h={'30px'} w={'20px'} bg={'gray.500'} onClick={(e) => { onOpen(), setIsClient(true), setIsEdit(true), setUserID(user?.id!) }}><EditIcon /></Button>
                    <Button fontSize={12} bg={'red.400'} h={'30px'} w={'20px'} color={'black'} onClick={() => { onOpen(), setIsDel(true) }}><DeleteIcon /></Button>
                    <Text fontSize={30} fontWeight={500}>Contacts List</Text>
                </Box>
                <Box>
                    <Button mr={2} onClick={disconect} fontSize={12}>Disconect</Button>
                    <Button backgroundColor={"green.500"} color={"black"} fontSize={12} onClick={() => { setIsClient(true), onOpen() }} >Add Client</Button>
                </Box>
            </Flex>
            <SimpleGrid spacing={10} margin={10} columns={[1, null, 2, null, null, 3]}>
                {
                    contacts.map((client, index) => {
                        return (
                            <Card key={index}>
                                <CardHeader>
                                    <Flex justifyContent={"space-between"} alignItems={'center'}>
                                        <Heading fontSize={18} maxWidth={'300px'}>
                                            {client.full_name}
                                        </Heading>
                                        <Box display={'flex'}>
                                            <Button id={client.id} onClick={e => { onOpen(), setIsClient(true), setIsEdit(true), setUserID(e.currentTarget.id) }} h={7} w={5} backgroundColor={"gray.500"} textAlign='center'><EditIcon /></Button>
                                            <Button id={client.id} onClick={e => { handleDelete(e.currentTarget.id, 'contacts') }} h={7} w={5} marginLeft={2} backgroundColor={"red.500"} textAlign='center'><DeleteIcon /></Button>
                                        </Box>
                                    </Flex>
                                </CardHeader>
                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box border={1}>
                                            Email: {client.email}
                                        </Box>
                                        <Box>
                                            Phone Number: {client.phone_number}
                                        </Box>
                                        <Box>
                                            Added At: {client.createdAt}
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        )
                    })
                }

            </SimpleGrid >

            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent>

                        {isDel ? (
                            <>
                                <ModalHeader>
                                    <Text>Delete Account</Text>
                                    <ModalCloseButton onClick={event => { setIsDel(false), reset() }} />
                                </ModalHeader>
                                <ModalBody p={5}>
                                    <Flex flexDirection={'column'} gap={5} alignItems={'center'} justifyContent={'center'}>

                                        <Text>Are you sure you want to delete your account?</Text>
                                        <Button bg={'red.400'} onClick={() => handleDelete(localStorage.getItem('userData')!, 'clients')}>Delete</Button>
                                    </Flex>
                                </ModalBody>
                            </>
                        ) : (
                            <>
                                {
                                    userID === user?.id ?
                                        (
                                            <ModalHeader>Edit your info</ModalHeader>
                                        )
                                        :
                                        (
                                            <ModalHeader>Contact Info</ModalHeader>
                                        )
                                }
                                <ModalCloseButton onClick={event => { setIsClient(false), reset() }} />
                                <ModalBody>
                                    {
                                        isEdit ? (
                                            <FormControl >
                                                {
                                                    userID === user?.id ? (
                                                        <>
                                                            <FormLabel htmlFor="fullName" marginTop={3}>Full Name</FormLabel>
                                                            <Input value={user.full_name} id="fullName" {...register("full_name", { required: false })} />

                                                            <FormLabel htmlFor="email" marginTop={3}>Email</FormLabel>
                                                            <Input placeholder="New Email" id="email" type={"email"} {...register("email", { required: false })} />

                                                            <FormLabel htmlFor="tel" marginTop={3}>Phone Number</FormLabel>
                                                            <Input value={user.phone_number} id="tel" type="number" {...register("phone_number", { required: false, minLength: 9, maxLength: 15 })} />
                                                            {errors.phone_number?.type === 'minLength' && <Text fontSize={10} color={'red.400'}>Min Length is 9</Text>}
                                                            {errors.phone_number?.type === 'maxLength' && <Text fontSize={10} color={'red.400'}>Max Length is 15</Text>}

                                                            <FormLabel htmlFor="tel" marginTop={3}>Password</FormLabel>
                                                            <Input placeholder="New password" type="password" {...register("password", { required: false, minLength: 9 })} />
                                                            {errors.password?.type === 'minLength' && <Text fontSize={10} color={'red.400'}>Min Length is 9</Text>}
                                                        </>

                                                    ) : (
                                                        <>
                                                            <FormLabel htmlFor="fullName" marginTop={3}>Full Name</FormLabel>
                                                            <Input id="fullName" {...register("full_name", { required: false })} />

                                                            <FormLabel htmlFor="email" marginTop={3}>Email</FormLabel>
                                                            <Input id="email" type={"email"} {...register("email", { required: false })} />

                                                            <FormLabel htmlFor="tel" marginTop={3}>Phone Number</FormLabel>
                                                            <Input id="tel" type="number" {...register("phone_number", { required: false, minLength: 9, maxLength: 15 })} />
                                                            {errors.phone_number?.type === 'minLength' && <Text fontSize={10} color={'red.400'}>Min Length is 9</Text>}
                                                            {errors.phone_number?.type === 'maxLength' && <Text fontSize={10} color={'red.400'}>Max Length is 15</Text>}
                                                        </>
                                                    )
                                                }

                                            </FormControl>
                                        ) : (
                                            <FormControl >
                                                <FormLabel htmlFor="fullName" marginTop={3}>Full Name</FormLabel>
                                                <Input id="fullName" {...register("full_name", { required: true })} />
                                                {errors.full_name?.type === 'required' && <Text fontSize={10} color={'red.400'}>Full Name is required</Text>}

                                                <FormLabel htmlFor="email" marginTop={3}>Email</FormLabel>
                                                <Input id="email" type={"email"} {...register("email", { required: true })} />
                                                {errors.email?.type === 'required' && <Text fontSize={10} color={'red.400'}>Email is required</Text>}

                                                <FormLabel htmlFor="tel" marginTop={3}>Phone Number</FormLabel>
                                                <Input id="tel" type="number" {...register("phone_number", { required: true, minLength: 9, maxLength: 15 })} />
                                                {errors.phone_number?.type === 'maxLength' && <Text fontSize={10} color={'red.400'}>Max Length is 15</Text>}
                                                {errors.phone_number?.type === 'required' && <Text fontSize={10} color={'red.400'}>Phone Number is required</Text>}
                                                {errors.phone_number?.type === 'minLength' && <Text fontSize={10} color={'red.400'}>Min Length is 9</Text>}
                                            </FormControl>


                                        )
                                    }
                                </ModalBody>

                                <ModalFooter justifyContent={"center"}>
                                    <Button type="submit" colorScheme='blue' mr={3} onClick={handleClick}>
                                        Send
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form >
            </Modal >
        </>
    )
}

export default Clients