import '../css/globals.css'
import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Projekt Szafran serwer</title>
      </Head>
        <main className=''>
          <Header />
          <Component {...pageProps} />
        </main>
        
    </>
  )
}

export default MyApp
