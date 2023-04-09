import React from 'react'
import Layout from '../../components/ui/Layout'

export default function Customer() {
  return (
    <div>Customer index page</div>
  )
}

Customer.getLayout = function getLayout(Customer) {
  return <Layout>{Customer}</Layout>;
};