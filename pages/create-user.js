import Head from 'next/head';

import Form from "../components/UserForm";
import Navbar from "../components/Navbar";


export default function CreateUser() {
  return <div>
    <Head>
      <title>Registrar Usuário</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <Form />
  </div>;
}

