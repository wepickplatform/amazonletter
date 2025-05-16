import client from './apollo-client';
import { gql } from '@apollo/client';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    sourceUrl: string;
    altText?: string;
  };
}

export async function getFeaturedPosts(count = 5) {
  const { data } = await client.query({
    query: gql`
      query FeaturedPosts($count: Int!) {
        posts(first: $count, where: { tag: "featured" }) {
          nodes {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `,
    variables: { count },
  });

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
  const { data } = await client.query({
    query: gql`
      query LatestPosts($count: Int!) {
        posts(first: $count) {
          nodes {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `,
    variables: { count },
  });

  return Array(count).fill(null).map((_, i) => ({
    id: `latest-${i}`,
    title: `최신 게시물 ${i + 1}`,
    slug: `latest-post-${i + 1}`,
    excerpt: '게시물 내용 미리보기...',
    date: new Date().toISOString(),
    featuredImage: { sourceUrl: '/images/placeholder.jpg' }
  }));
}
