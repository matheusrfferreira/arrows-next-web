import axios from 'axios';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Divider
} from '@chakra-ui/react';

import PostComment from './PostComment';
import PostUser from './PostUser';


export default function Post({post}) {



  return (
    <Center py={6} >
      <Box 
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
           <PostUser userId={post.user_id} />
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {post.title}
          </Heading>
          <Text color={'gray.500'}>
            {post.body}
          </Text>
        </Stack>
        
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
         
            <PostComment postId={post.id} />
         
        </Stack>
      </Box>
    </Center>
  );
};



