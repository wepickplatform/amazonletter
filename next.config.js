/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['letter.wepick.kr'], // 워드프레스 이미지 도메인 추가
  },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  },
}

module.exports = nextConfig
