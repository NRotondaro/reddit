import type { NextPage } from 'next'
import Head from 'next/head'
import { PostBox } from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />
    </div>
  )
}

export default Home
