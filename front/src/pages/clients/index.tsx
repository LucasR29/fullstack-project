import api from "@/services/api"
import { Clients } from "@/types"
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack,
    StackDivider,
    Box,
    SimpleGrid,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
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

import { MinusIcon, AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"


interface Props {
    clients: Clients[]
}

const Clients: NextPage<Props> = ({ clients }) => {
    const router = useRouter()
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isClient, setIsClient] = useState(false)
    const [userID, setUserID] = useState('')
    const [isEdit, setIsEdit] = useState(false)
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

    const onSubmit = (data: any) => {
        isClient ? (
            isEdit ? (
                api.patch(`/clients/${userID}`, data)
                    .catch(function (error) {
                        showToast(error.response.data.message, "red.500")
                        console.log(error)
                    })
            ) : (
                api.post('/clients', data)
                    .catch(function (error) {
                        showToast(error.response.data.message, "red.500")
                        console.log(error)
                    })
            )
        ) : (
            isEdit ? (
                api.patch(`/contacts/${userID}`, data)
                    .catch(function (error) {
                        showToast(error.response.data.message, "red.500")
                        console.log(error)
                    })
            ) : (
                api.post(`/contacts/${userID}`, data)
                    .catch(function (error) {
                        showToast(error.response.data.message, "red.500")
                        console.log(error)
                    })
            )
        )
        resetRefresh()
    }

    const handleDelete = (id: string, route: string) => {
        api.delete(`/${route}/${id}`)
        resetRefresh()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent>
                        {
                            isClient ? (
                                <ModalHeader>Client Info</ModalHeader>
                            ) : (
                                <ModalHeader>Contact Info</ModalHeader>
                            )
                        }
                        <ModalCloseButton onClick={event => { setIsClient(false), reset() }} />
                        <ModalBody>

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

                        </ModalBody>

                        <ModalFooter justifyContent={"center"}>
                            <Button type="submit" colorScheme='blue' mr={3} onClick={handleClick}>
                                Send
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
            <Flex margin={10} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={30} fontWeight={500}>Clients List</Text>
                <Button backgroundColor={"green.500"} color={"black"} onClick={() => { setIsClient(true), onOpen() }}>Add Client</Button>
            </Flex>
            <SimpleGrid spacing={10} margin={10}>
                {
                    clients.map((client, index) => {
                        return (
                            <Card>
                                <CardHeader>
                                    <Flex justifyContent={"space-between"} alignItems={'center'}>

                                        <Heading >
                                            {client.full_name}
                                        </Heading>
                                        <Box>
                                            <Button id={client.id} onClick={e => { onOpen(), setIsClient(true), setIsEdit(true), setUserID(e.currentTarget.id) }} h={7} w={5} backgroundColor={"gray.500"} textAlign='center'><EditIcon /></Button>
                                            <Button id={client.id} onClick={e => { handleDelete(e.currentTarget.id, 'clients') }} h={7} w={5} marginLeft={2} backgroundColor={"red.500"} textAlign='center'><DeleteIcon /></Button>
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
                                        <Box>
                                            <Accordion allowToggle>
                                                <AccordionItem border={'none'}>
                                                    <h2>
                                                        <AccordionButton backgroundColor={'gray.800'} borderRadius={10}>
                                                            <Box flex={1} textAlign={'left'}>
                                                                Contacts
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel>
                                                        <SimpleGrid>
                                                            <Accordion allowToggle overflow={"auto"}>
                                                                {client.contacts.map((contact, index) => {
                                                                    return (
                                                                        <AccordionItem marginTop={2} border='none'>
                                                                            {({ isExpanded }) => (
                                                                                <>
                                                                                    <h2>
                                                                                        <AccordionButton backgroundColor={"gray.600"} borderRadius={10}>
                                                                                            <Box flex={1} textAlign={"left"}>
                                                                                                {contact.full_name}
                                                                                            </Box>
                                                                                            {isExpanded ? (
                                                                                                <MinusIcon fontSize='12px' backgroundColor={'red.500'} h={5} w={5} padding={1} borderRadius={5} />

                                                                                            ) : (
                                                                                                <AddIcon fontSize='12px' backgroundColor={'green.500'} h={5} w={5} padding={1} borderRadius={5} />
                                                                                            )}
                                                                                        </AccordionButton>
                                                                                    </h2>
                                                                                    <AccordionPanel backgroundColor={"gray.900"} borderRadius={10} margin={2}>
                                                                                        <Stack divider={<StackDivider />} spacing={2}>
                                                                                            <Box>Email: {contact.email}</Box>
                                                                                            <Box>Phone Number: {contact.phone_number}</Box>
                                                                                            <Box>Created At: {contact.createdAt}</Box>
                                                                                            <Box>
                                                                                                <Button id={contact.id} onClick={e => { onOpen(), setIsClient(false), setIsEdit(true), setUserID(e.currentTarget.id) }} h={7} w={5} backgroundColor={"gray.500"} textAlign='center'><EditIcon /></Button>
                                                                                                <Button id={contact.id} onClick={e => { handleDelete(e.currentTarget.id, 'contacts') }} h={7} w={5} marginLeft={2} backgroundColor={"red.500"} textAlign='center'><DeleteIcon /></Button>
                                                                                            </Box>
                                                                                        </Stack>
                                                                                    </AccordionPanel>
                                                                                </>
                                                                            )}
                                                                        </AccordionItem>
                                                                    )
                                                                })}

                                                            </Accordion>
                                                        </SimpleGrid>
                                                        <Button id={client.id} marginTop={5} h={7} w={20} fontSize={12} backgroundColor={'green.700'} onClick={event => { setUserID(event.currentTarget.id), onOpen() }}>
                                                            Add Contact
                                                        </Button>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            </Accordion>
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        )
                    })
                }

            </SimpleGrid >
        </>
    )
}

export default Clients


export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const response = await api.get("/clients")
    const clients = response.data

    return { props: { clients } }
}