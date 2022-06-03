import { useQuery } from '@apollo/client'
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import { SubredditRow } from './SubredditRow'

export const Comunities = () => {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })

  const subreddits: Subreddit[] = data?.getSubredditListLimit

  return (
    <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
      <p className="text-md mb-1 p-4 pb-3 font-bold">Top comunities</p>

      <div>
        {subreddits?.map((subreddit, i) => (
          <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
        ))}
      </div>
    </div>
  )
}
