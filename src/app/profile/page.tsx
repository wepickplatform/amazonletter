'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $firstName: String, $lastName: String, $email: String) {
    updateUser(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      user {
        id
        name
        email
      }
    }
  }
`

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user) {
      // 사용자 정보 가져오기
      const fetchUserData = async () => {
        try {
          // 여기서는 간단하게 세션에서 가져온 정보만 사용
          const nameParts = session.user.name?.split(' ') || ['', '']
          setFirstName(nameParts[0] || '')
          setLastName(nameParts.slice(1).join(' ') || '')
          setEmail(session.user.email || '')
        } catch (error) {
          console.error('사용자 정보 가져오기 실패:', error)
        }
      }
      
      fetchUserData()
    }
  }, [session, status, router])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: session.user.id,
          firstName,
          lastName,
          email,
        },
        context: {
          headers: {
            Authorization: `Bearer ${session.user.wpToken}`,
          },
        },
      })
      
      if (data.updateUser) {
        setMessage({
          type: 'success',
          text: '프로필이 성공적으로 업데이트되었습니다.',
        })
      }
    } catch (error) {
      console.error('프로필 업데이트 실패:', error)
      setMessage({
        type: 'error',
        text: '프로필 업데이트 중 오류가 발생했습니다.',
      })
    } finally {
      setLoading(false)
    }
  }
  
  if (status === 'loading') {
    return <div className="container-custom py-12">로딩 중...</div>
  }
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">내 프로필</h1>
        
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
            <label htmlFor="firstName" className="block text-gray-700 mb-2">
              이름
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 mb-2">
              성
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex justify-center"
          >
            {loading ? '업데이트 중...' : '프로필 업데이트'}
          </button>
        </form>
      </div>
    </div>
  )
}
