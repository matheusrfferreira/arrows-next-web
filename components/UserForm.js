import { useState } from 'react';
import {
  Flex, Box, FormControl, FormLabel, Input, Stack,
  Button, Heading, useColorModeValue, Select, Badge, Center
} from '@chakra-ui/react';
import axios from "axios";


export default function Form() {

  const initialFormState = {
    name: "",
    email: "",
    gender: "male",
    status: "active",
  };

  const[formState, setFormState] = useState(initialFormState);
  const[formError, setFormError] = useState("");

  const[createdUser, setCreatedUser] = useState(false);
  const[failedCreatedUser, setFailedCreatedUser] = useState(false);

  const[creating, setCreating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /^[a-zA-Z ]+$/;

    for(let key in formState){
      if(formState[key]===''){
        setFormError(`You must provide the ${key}!`);
        return;
      };
      if(!regex.test(key)){
        setFormError(`You must provide a correct ${key}!`);
        return;
      };
    };
    setFormError("");

    setCreating(true);

    const API_KEY = process.env.API_KEY;
    const headers = { "Authorization": `Bearer ${API_KEY}` };
    const url = "https://gorest.co.in/public/v1/users";
    axios.post(url, formState, { headers })
    .then((response) => {
      setCreatedUser(true);
      setCreating(false);
    })
    .catch((error) => {
      setFailedCreatedUser(true);
      setCreating(false);
    });
    setFormState(initialFormState);
  };

  const handleChange = (e) => {
    setCreatedUser(false);
    setFailedCreatedUser(false);
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFormState(prev => ({...prev, [inputName]: value}));
  };
   
  return <Flex
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Criar um novo usuário
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Nome</FormLabel>
              <Input type="text" value={formState.name} name="name" onChange={handleChange} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={formState.email} name="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Status</FormLabel>
              <Select value={formState.status} name="status" onChange={handleChange}>
                <option value='active'>Ativo</option>
                <option value='inactive'>Inativo</option>
              </Select>
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Gênero</FormLabel>
              <Select value={formState.gender} name="gender" onChange={handleChange}>
                <option value='male'>Masculino</option>
                <option value='female'>Feminino</option>
              </Select>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Criando"
                isLoading={creating}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Criar Usuário
              </Button>
            </Stack>
          </Stack>
          {formError}
          </form>
          {createdUser && (<Center h='50px' color='white'>
              <Badge colorScheme='green'>Usuário criado com sucesso!</Badge>
            </Center>)}
          {failedCreatedUser && (<Center h='50px' color='white'>
              <Badge colorScheme='red'>Erro na criação do usuário!</Badge>
              </Center>)}
        </Box>
      </Stack>
    </Flex>;
};