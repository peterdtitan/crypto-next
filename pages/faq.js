import React from 'react';
import Layout from '../components/ui/Layout'

export default function Faq(){
    return (
        <div>Faq</div>
    )
}

Faq.getLayout = function getLayout(Faq) {
    return <Layout>{Faq}</Layout>;
  }