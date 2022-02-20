import axios from "axios";
import { useState } from "react";
import React from 'react';
import { Stack, Text, Button, Avatar, AvatarBadge } from '@chakra-ui/react';

export default function PostUser({userId}){

  const[user, setUser] = useState({
    name: "",
    status: "active",
  });
  
  axios.get(`https://gorest.co.in/public/v2/users/${userId}`)
    .then((response) => {
      console.log(response.data);
      setUser(response.data)
    })
    .catch((err) => console.log(err))

  return <Stack  direction={'row'} spacing={4} align={'center'} marginBottom="13px">
    <Avatar
      name={user.name}
      src={''}
      alt={user.name}
      css={{
        border: '2px solid white',
      }}
      > <AvatarBadge boxSize='1.25em' bg={user.status === 'active' ? 'green.500' : 'red.500'} /></Avatar>
      <Text fontWeight={600}>{user.name}</Text> 
  </Stack>;
};