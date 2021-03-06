import { useState } from "react";
import { Modal, Select, FormControl, Input, FormLabel, 
  Button, Badge, Center, useDisclosure, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useColorModeValue
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
    <Button onClick={onOpen} w={'full'}
            mt={8}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}> Edit User </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="edit-user-form" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required value={formState.name} name="name" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input required value={formState.email} name="email" onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select required value={formState.status} name="status" onChange={handleChange}>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select required value={formState.gender} name="gender" onChange={handleChange}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </Select>
            </FormControl>
            </form>
          </ModalBody>
          {formError}
          {editedUser && (<Center h='50px' color='white'>
            <Badge colorScheme='green'>Usu??rio editado com sucesso!</Badge>
            </Center>)}
          {failedEditedUser && (<Center h='50px' color='white'>
            <Badge colorScheme='red'>Erro ao editar o usu??rio!</Badge>
            </Center>)}
          <ModalFooter>
            <Button type="submit" form="edit-user-form" colorScheme='blue' mr={3} 
            isLoading={saving} loadingText='Salvando'>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>;
};