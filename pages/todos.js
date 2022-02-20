import Head from 'next/head';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function Todos({ todos }) {
  
  
  
  return (
    <Footer />

  )
}

export async function getServerSideProps(context) {
 
  const res = await fetch(`https://gorest.co.in/public/v1/users${"?page="+context.query.page || ""}`);
  const todos = await res.json();

  return { props: { todos } };
};