import api from './api'

type CreatPostParams = {
  title: string
  desc: string
}

type PostResponse = {
  title: string
  desc: string
  userId: number
  createdAt: Date
  updatedAt: Date
}

export const fetchPostCount = (): Promise<number> => api.get('/posts/count')

export const createPost = (params: CreatPostParams): Promise<PostResponse> => api.post('/posts', params)

export const fetchPosts = (params: any): Promise<[]> => api.get('/posts', { params })

export const patchVote = (id: number, hasVote: boolean) => api.patch(`/posts/${id}/vote`, { hasVote })
