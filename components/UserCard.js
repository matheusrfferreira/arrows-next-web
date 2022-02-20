import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  AvatarBadge,
  Grid
} from '@chakra-ui/react';

import EditUser from "./UserEdit";


export default function User({ user }) {
  return (
    <Center py={6}>
      <Box
        maxW={'280px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
          alt="Cover image"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar size={'xl'} name={user.name} css={{
              border: '2px solid white',
            }}>
            <AvatarBadge boxSize='1.25em' bg={user.status === 'active' ? 'green.500' : 'red.500'} />
          </Avatar>
        </Flex>
        <Box p={6}>
          <Grid spacing={0} align={'center'} mb={5} >
            <Heading fontSize={'2xl'} align={'center'} fontWeight={500} fontFamily={'body'} isTruncated marginRight={'10px'} marginLeft={'10px'}>
              {user.name}
            </Heading>
            <Text color={'gray.500'} align={'center'} isTruncated>{user.email}</Text>
          </Grid>
          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600} color={user.gender === 'male' ? '#63B3ED' : '#ED64A6'}>{user.gender}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Gender
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600} color={user.status === 'active' ? '#38A169' : 'tomato'}>{user.status}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Status
              </Text>
            </Stack>
          </Stack>
             <EditUser user={user}  />
        </Box>
      </Box>
    </Center>
  );
}