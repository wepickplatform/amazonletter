'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $content: String!, $status: PostStatusEnum) {
    createPost(
      input: {
        title: $title
        content: $content
        status: $status
      }
    ) {
      post {
        id
        title
        slug
      }
    }
  }
`

export default function EditorPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  useEffect(() => {
    // 권한 확인
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user && session.user.role !== 'marketer') {
      router.push('/')
    }
  }, [session, status, router])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      const { data } = await client.mutate({
        mutation: CREATE_POST_MUTATION,
        variables: {
          title,
          content,
          status: 'PUBLISH',
        },
        context: {
          headers: {
            Authorization: `Bearer ${session.user.wpToken}`,
          },
        },
      })
      
      if (data.createPost) {
        setMessage({
          type: 'success',
          text: '게시물이 성공적으로 작성되었습니다.',
        })
        setTitle('')
        setContent('')
      }
    } catch (error) {
      console.error('게시물 작성 실패:', error)
      setMessage({
        type: 'error',
        text: '게시물 작성 중 오류가 발생했습니다.',
      })
    } finally {
      setLoading(false)
    }
  }
  
  if (status === 'loading') {
    return <div className="container-custom py-12">로딩 중...</div>
  }
  
  if (session?.user?.role !== 'marketer') {
    return null // 권한 없음 (useEffect에서 리디렉션 처리)
  }
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">새 게시물 작성</h1>
        
        {message.text && (
          <div
            className={`${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            } border px-4 py-3 rounded mb-4`}
          >
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 mb-2">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px]"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-3 px-6"
          >
            {loading ? '게시 중...' : '게시하기'}
          </button>
        </form>
      </div>
    </div>
  )
}
