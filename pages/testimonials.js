import React from 'react'
import Layout from '../components/ui/Layout'

export default function Testimonials() {
  return (
    <div>Testimonials</div>
  )
}

Testimonials.getLayout = function getLayout(Testimonials) {
  return <Layout>{Testimonials}</Layout>;
}