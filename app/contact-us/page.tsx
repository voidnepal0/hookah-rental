import React from 'react'
import ContacatClient from './ContacatClient'
import ContactForm from '../../components/contact/ContactForm'

const page = () => {
  return (
    <main>
        <ContacatClient />
        <ContactForm />
    </main>
  )
}

export default page