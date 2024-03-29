import { useSession } from 'next-auth/react';
import { Avatar } from './Avatar';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutation';
import client from '../apollo-client';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';
import toast from 'react-hot-toast';

interface FormData {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
}

interface Props {
  subreddit?: string;
}

export const PostBox = ({ subreddit }: Props) => {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Creating new post...');
    try {
      /* Query for the subreddit topic... */
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
        // Create subreddit...
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
      } else {
        // Use existing subreddit
        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
      }
      /* After the post has been added! */
      setValue('postBody', '');
      setValue('postImage', '');
      setValue('postTitle', '');
      setValue('subreddit', '');

      toast.success('New post created', {
        id: notification,
      });
    } catch (error) {
      toast.error('Whoops something went wrong!', {
        id: notification,
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className='sticky top-20 z-50 rounded-md border border-gray-300 bg-white p-2'>
      <div className='flex items-center space-x-3'>
        <Avatar />

        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className='flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none'
          type='text'
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : 'Create a post by entering a title!'
              : 'Sign In to post'
          }
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${imageBoxOpen && 'text-blue-300'}`}
        />
        <LinkIcon className='h-6 text-gray-300' />
      </div>

      {!!watch('postTitle') && (
        <div className='flex flex-col py-2'>
          <div className='flex items-center px-2'>
            <p className='min-w-[90px]'>Body</p>
            <input
              className='m-2 flex-1 bg-blue-50 p-2 outline-none'
              {...register('postBody')}
              type='text'
              placeholder='Text (optional)'
            />
          </div>
          {!subreddit && (
            <div className='flex items-center px-2'>
              <p className='min-w-[90px]'>Subreddit</p>
              <input
                className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                {...register('subreddit', { required: true })}
                type='text'
                placeholder='i.e. reactjs'
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className='flex items-center px-2'>
              <p className='min-w-[90px]'>Image URL:</p>
              <input
                className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                {...register('postImage')}
                type='text'
                placeholder='Optional...'
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className='space-y-2 p-2 text-red-500'>
              {errors.postTitle?.type === 'required' && <p>A Post Title is required</p>}

              {errors.subreddit?.type === 'required' && <p>A Subreddit is required</p>}
            </div>
          )}

          {watch('postTitle') && (
            <button type='submit' className='w-full rounded-full bg-blue-400 p-2 text-white'>
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};
