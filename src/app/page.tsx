import FeaturedSlider from '@/components/FeaturedSlider'
import NewsCard from '@/components/NewsCard'

// 더미 데이터
const featuredPosts = Array(5).fill(null).map((_, i) => ({
  id: `featured-${i}`,
  title: `인기 게시물 ${i + 1}`,
  slug: `featured-post-${i + 1}`,
  excerpt: '게시물 내용 미리보기...',
  date: new Date().toISOString(),
  featuredImage: { sourceUrl: '/images/placeholder.jpg' }
}));

const latestPosts = Array(12).fill(null).map((_, i) => ({
  id: `latest-${i}`,
  title: `최신 게시물 ${i + 1}`,
  slug: `latest-post-${i + 1}`,
  excerpt: '게시물 내용 미리보기...',
  date: new Date().toISOString(),
  featuredImage: { sourceUrl: '/images/placeholder.jpg' }
}));

export default function Home() {
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
