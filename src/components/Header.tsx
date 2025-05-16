'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            트렌디 뉴스레터
          </Link>
          
          {/* 모바일 메뉴 버튼 */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              홈
            </Link>
            {session ? (
              <>
                <Link href="/profile" className="hover:text-blue-600 transition-colors">
                  프로필
                </Link>
                {session.user.role === 'marketer' && (
                  <Link href="/editor" className="hover:text-blue-600 transition-colors">
                    글쓰기
                  </Link>
                )}
                <button 
                  onClick={() => signOut()}
                  className="hover:text-blue-600 transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-primary">
                로그인
              </Link>
            )}
          </nav>
        </div>
        
        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3">
            <Link href="/" className="block hover:text-blue-600 transition-colors">
              홈
            </Link>
            {session ? (
              <>
                <Link href="/profile" className="block hover:text-blue-600 transition-colors">
                  프로필
                </Link>
                {session.user.role === 'marketer' && (
                  <Link href="/editor" className="block hover:text-blue-600 transition-colors">
                    글쓰기
                  </Link>
                )}
                <button 
                  onClick={() => signOut()}
                  className="block hover:text-blue-600 transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link href="/login" className="block btn-primary inline-block">
                로그인
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
