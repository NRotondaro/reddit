import { useSession } from 'next-auth/react'
import { Avatar } from './Avatar'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'

export const PostBox = () => {
  const { data: session } = useSession()
  return (
    <form className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2">
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          disabled={!session}
          className="bg-gray-50 rounded-md flex-1 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session ? 'Create a post by entering a title!' : 'Sign In to post'
          }
        />

        <PhotographIcon className={`h-6 text-gray-300 cursor-pointer`} />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
    </form>
  )
}
