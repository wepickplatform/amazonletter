import client from './apollo-client';
import { gql } from '@apollo/client';

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

  return data.posts.nodes.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: post.date,
    featuredImage: post.featuredImage?.node || null,
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

  return data.posts.nodes.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: post.date,
    featuredImage: post.featuredImage?.node || null,
  }));
}
