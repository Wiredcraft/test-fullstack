import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import { fetchPosts, patchVote } from '@/services/post'
import { useImmer } from 'use-immer'
import { useToasts } from 'react-toast-notifications'
import queryString from 'query-string'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { formatTime } from '@/utils'

interface PostItemProps {
  post: any
  toggleVote: () => void
}

function PostItem({
  post, 
  toggleVote
}: PostItemProps) {
  const { index, title, desc, hasVote, createdAt, user } = post
  return (
    <div className='post-item'>
      <div className='post-wrapper'>
        <div className='serial-number'>{index + 1}.</div>
        <div className='post-content'>
          <div className='title'>{title}</div>
          <div className='desc'>{desc}</div>
          <div className='desc'>{formatTime(createdAt)}/Created by {user?.username}</div>
        </div>
      </div>
      <div className='vote-btn' onClick={toggleVote}>{hasVote ? 'Unvote' : 'Vote'}</div>
    </div>
  )
}

export default function() {

  const { token } = useStore()
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useImmer(false)
  const [hasMore, setHasMore] = useState(false)
  const { addToast } = useToasts()
  const location = useLocation()
  const navigate = useNavigate()
  const p = queryString.parse(location.search)?.p
  const page = p ? +p : 1

  useEffect(() => {
    fetchPosts({
      filter: {
        offset: (page - 1) * 10,
        limit: 10,
        order: ['voteCount DESC'],
        include: [
          { 
            relation: 'user', 
            scope: { 
              fields: { id: true, username: true } 
            }
          },
          { relation: 'votes' }
        ],
      }
    }).then((res) => {
      setPosts(res)
      const hasMore = res?.length >= 10 ? true : false
      setHasMore(hasMore)
    }).catch(err => {
      console.log('err :>> ', err);
    })
  }, [refresh, page, token])

  const toggleVoteHandle = async (data: any) => {
    if (!token) {
      navigate('/login')
      return 
    }
    try {
      await patchVote(data.id, !data.hasVote)
      addToast(data.hasVote ? 'Unvote successed' : 'Vote successed', { appearance: 'success' })
      setRefresh(prev => !prev)
    } catch (err: any) {
      addToast(err.message, { appearance: 'error' })
    }
  }

  const fetchMoreHandle = () => {
    navigate(`/?p=${page+1}`)
  }

  return (
    <Layout>
      {!!posts?.length ? (
        <>
        <div className='dashboard-wrapper'>
          {posts.map((p: any, index) => (
            <PostItem key={p.id} post={{...p, index}} toggleVote={() => toggleVoteHandle(p)} />
          ))}
        </div>
        {hasMore && <div className='more-btn' onClick={fetchMoreHandle}>More...</div>}
        </>
      ) : (
        <div className='no-post-wrapper'>There's no talk yet, go to share your own history...</div>
      )}
    </Layout>
  )
}