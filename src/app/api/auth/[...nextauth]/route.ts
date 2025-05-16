import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

// 역할 타입 정의
interface Role {
  name: string;
}

const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      user {
        id
        name
        email
        roles {
          nodes {
            name
          }
        }
      }
    }
  }
`

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'WordPress',
      credentials: {
        username: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              username: credentials?.username,
              password: credentials?.password,
            },
          })

          if (data.login.authToken) {
            // 사용자 역할 확인
            const isMarketer = data.login.user.roles.nodes.some(
              (role: Role) => role.name === 'marketer' || role.name === 'administrator'
            )

            return {
              id: data.login.user.id,
              name: data.login.user.name,
              email: data.login.user.email,
              role: isMarketer ? 'marketer' : 'subscriber',
              token: data.login.authToken,
            }
          }
          return null
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role
        token.wpToken = user.token
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.role = token.role
        session.user.wpToken = token.wpToken
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }
