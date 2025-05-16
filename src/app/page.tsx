import FeaturedSlider from '@/components/FeaturedSlider'
import NewsCard from '@/components/NewsCard'
import { getLatestPosts, getFeaturedPosts } from '@/lib/wordpress'

export default async function Home() {
  const featuredPosts = await getFeaturedPosts(5);
  const latestPosts = await getLatestPosts(12);
  
  return (
    <div className="container-custom py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">인기 게시물</h2>
        <FeaturedSlider posts={featuredPosts} />
      </section>
      
      <section>
        <h2 className="text-3xl font-bold mb-6">최신 게시물</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map(post => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
