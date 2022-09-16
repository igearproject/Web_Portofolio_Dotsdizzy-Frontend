import Head from 'next/head'
import React from 'react'
import Footer from '../Footer'
import NavbarHome from '../NavbarHome'

const HomeLayout = ({title,metaDesc,metaKey,children}) => {
  return (
    <>
        <Head>
            {title?(<title>{title} - {process.env.NEXT_PUBLIC_APP_NAME}</title>):(<title>{process.env.NEXT_PUBLIC_APP_NAME} - {process.env.NEXT_PUBLIC_APP_DESC}</title>)}
            {metaKey?(<meta name="keyword" content={metaKey}/>):(<meta name="keyword" content="dotsdizzy, illustration designer indonesia, book illustration, wall illustration, full color illustration,  illustrator indonesia, illustrator bali, illustrator, illustrasi, jasa illustrator indonesia, jasa illustrator indonesia, i gede made padma yasa" />)}
            {metaDesc?(<meta name="description" content={metaDesc} />):(<meta name="description" content="Dotsdizzy illustration designer from indonesia, i can help you to make unique illustration for you, your bussiness or your organization" />)}
        </Head>
        <header>
            <NavbarHome bgC="dark" variant="dark" fluid={true}/>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>
    </>
  )
}

export default HomeLayout