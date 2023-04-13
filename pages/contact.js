import React from 'react'
import Layout from '../components/ui/Layout'

export default function Contact() {
  return (
    <div>Contact</div>
  )
}

Contact.getLayout = function getLayout(Contact) {
  return <Layout>{Contact}</Layout>;
}