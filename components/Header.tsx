import Image from 'next/image';
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon, HomeIcon, MenuIcon, SearchIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className='sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm'>
      <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
        <Link href='/'>
          <Image
            layout='fill'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Reddit_logo_new.svg/2560px-Reddit_logo_new.svg.png'
            objectFit='contain'
          />
        </Link>
      </div>

      <div className='xl:miw-w-[300px] mx-7 flex items-center'>
        <HomeIcon className='h-5 w-5' />
        <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
        <ChevronDownIcon className='h-5 w-5' />
      </div>

      <form className='flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1'>
        <SearchIcon className='h-6 w-6 text-gray-400' />
        <input
          className='flex-1 bg-transparent outline-none'
          type='text'
          placeholder='Search Reddit'
        />
        <button type='submit' hidden />
      </form>

      <div className='mx-5 hidden space-x-2 text-gray-500 lg:inline-flex'>
        <SparklesIcon className='icon' />
        <GlobeIcon className='icon' />
        <VideoCameraIcon className='icon' />
        <hr className='h-10 border border-gray-100' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <PlusIcon className='icon' />
        <SpeakerphoneIcon className='icon' />
      </div>
      <div className='ml-5 flex items-center lg:hidden'>
        <MenuIcon className='icon' />
      </div>

      {session ? (
        <div
          onClick={() => signOut()}
          className='hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex'>
          <div className='relative h-5 w-5 flex-shrink-0'>
            <Image
              src='https://logoeps.com/wp-content/uploads/2014/09/52053-reddit-logo-icon-vector-icon-vector-eps.png'
              alt='outline-logo'
              layout='fill'
              objectFit='contain'
            />
          </div>

          <div className='flex-1 text-xs'>
            <p className='truncate'>{session?.user?.name}</p>
            <p className='text-gray-400'>1 Karma</p>
          </div>

          <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400' />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className='hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex'>
          <div className='relative h-5 w-5 flex-shrink-0'>
            <Image
              src='https://logoeps.com/wp-content/uploads/2014/09/52053-reddit-logo-icon-vector-icon-vector-eps.png'
              alt='outline-logo'
              layout='fill'
              objectFit='contain'
            />
          </div>

          <p className='text-gray-400'>Sign In</p>
        </div>
      )}
    </div>
  );
};
