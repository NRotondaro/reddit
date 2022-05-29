import Image from 'next/image'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import {
  ChevronDownIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
} from '@heroicons/react/solid'

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          layout="fill"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Reddit_logo_new.svg/2560px-Reddit_logo_new.svg.png"
          objectFit="contain"
        />
      </div>

      <div className="flex items-center mx-7 xl:miw-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className="text-gray-500 space-x-2 mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      <div className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer">
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image
            src="https://logoeps.com/wp-content/uploads/2014/09/52053-reddit-logo-icon-vector-icon-vector-eps.png"
            alt="outline-logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="text-gray-400">Sign In</p>
      </div>
    </div>
  )
}
