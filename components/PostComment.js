import axios from "axios";
import { useState } from "react";
import React from 'react';
import { Stack, Text, Button, Spinner, Flex } from '@chakra-ui/react';

export default function PostComment({postId}){

  const[comments, setComments] = useState([]);
  
  axios.get(`https://gorest.co.in/public/v2/posts/${postId}/comments`)
    .then((response) => {
      setComments(response.data)
    })
    .catch((err) => console.log(err))
  
  return <Flex alignItems={'flex-start'} direction="column" >
    {comments === [] ? <Spinner /> : comments.map((comment) => (<Stack key={comment.id} p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" >
        <Text fontWeight="semibold">{comment.name}</Text>
      </Stack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between">
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          {comment.body}
        </Text>
      </Stack>
    </Stack>))}
  </Flex>;
};