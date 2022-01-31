import {
  Table, Thead, Tbody, Button,
  Tr, Th, Td, TableCaption,
} from '@chakra-ui/react';

import EditUser from "./EditUser";


export default function TableOfUsers({ users, children }) {
  return <Table variant='simple'>
    <TableCaption> {children} </TableCaption>
    <Thead>
      <Tr>
        <Th>Nome</Th>
        <Th>Email</Th>
        <Th>Status</Th>
        <Th>Gênero</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        users.map(user => (<Tr key={user.id}>
          <Td>{user.name}</Td>
          <Td>{user.email}</Td>
          <Td>{user.status}</Td>
          <Td>{user.gender}</Td>
          <Td><EditUser user={user} /></Td>
        </Tr>))
      }
    </Tbody>
  </Table> ;
};

