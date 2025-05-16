import client from './apollo-client';
import { gql } from '@apollo/client';

export async function getFeaturedPosts(count = 5) {
  // 실제 API 연결 전 더미 데이터 반환
  return Array(count).fill(null).map((_, i) => ({
    id: `featured-${i}`,
    title: `인기 게시물 ${i + 1}`,
    slug: `featured-post-${i + 1}`,
    excerpt: '게시물 내용 미리보기...',
    date: new Date().toISOString(),
    featuredImage: { sourceUrl: '/images/placeholder.jpg' }
  }));
}

export async function getLatestPosts(count = 12) {
  // 실제 API 연결 전 더미 데이터 반환
  return Array(count).fill(null).map((_, i) => ({
    id: `latest-${i}`,
    title: `최신 게시물 ${i + 1}`,
    slug: `latest-post-${i + 1}`,
    excerpt: '게시물 내용 미리보기...',
    date: new Date().toISOString(),
    featuredImage: { sourceUrl: '/images/placeholder.jpg' }
  }));
}
