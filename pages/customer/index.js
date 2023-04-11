import React from 'react'
import ProfileComponent from '../../components/customers/ProfileComponent';
import Layout from '../../components/ui/Layout'

export default function Customer() {
  return (
    <ProfileComponent />
  )
}

Customer.getLayout = function getLayout(Customer) {
  return <Layout>{Customer}</Layout>;
};