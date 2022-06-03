import type { NextPage } from 'next'
import Head from 'next/head'
import { Comunities } from '../components/Comunities'
import { Feed } from '../components/Feed'
import { PostBox } from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />

      <div className="flex">
        <Feed />

        <Comunities />
      </div>
    </div>
  )
}

export default Home
