import { useState } from "react";
import { Modal, Select, FormControl, Input, FormLabel, 
  Button, Badge, Center, useDisclosure, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import axios from "axios";


export default function EditUser({ user }){
  const initialFormState = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    status: user.status,
  };
 
  const[formState, setFormState] = useState(initialFormState);
  const[formError, setFormError] = useState("");

  const[editedUser, setEditedUser] = useState(false);
  const[failedEditedUser, setFailedEditedUser] = useState(false);

  const[saving, setSaving] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

    setSaving(true);

    const API_KEY = process.env.API_KEY;
    const headers = { "Authorization": `Bearer ${API_KEY}` };
    const url = `https://gorest.co.in/public/v1/users/${user.id}`;
    axios.put(url, formState, { headers })
    .then((response) => {
        setEditedUser(true);
        setSaving(false);
    })
    .catch((error) => {
        setFailedEditedUser(true);
        setSaving(false);
    });
    setFormState(formState);
  };

  const handleChange = (e) => {
    setEditedUser(false);
    setFailedEditedUser(false);
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFormState(prev => ({...prev, [inputName]: value}));
  };

  return <>
      <Button onClick={onOpen}> <SettingsIcon/> </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="edit-user-form" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input required value={formState.name} name="name" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input required value={formState.email} name="email" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select required value={formState.status} name="status" onChange={handleChange}>
                <option value='active'>Ativo</option>
                <option value='inactive'>Inativo</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Gênero</FormLabel>
              <Select required value={formState.gender} name="gender" onChange={handleChange}>
                <option value='male'>Masculino</option>
                <option value='female'>Feminino</option>
              </Select>
            </FormControl>
            </form>
          </ModalBody>
          {formError}
          {editedUser && (<Center h='50px' color='white'>
            <Badge colorScheme='green'>Usuário editado com sucesso!</Badge>
            </Center>)}
          {failedEditedUser && (<Center h='50px' color='white'>
            <Badge colorScheme='red'>Erro ao editar o usuário!</Badge>
            </Center>)}
          <ModalFooter>
            <Button type="submit" form="edit-user-form" colorScheme='blue' mr={3} 
            isLoading={saving} loadingText='Salvando'>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>;
};