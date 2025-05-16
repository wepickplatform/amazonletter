import Link from 'next/link';
import Image from 'next/image';

export default function NewsCard({ post }) {
  return (
    <div className="card">
      <div className="relative h-48 w-full">
        <Image
          src={post.featuredImage?.sourceUrl || '/images/placeholder.jpg'}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-3">{post.excerpt}</p>
        <Link href={`/post/${post.slug}`} className="text-blue-600 hover:underline">
          자세히 보기
        </Link>
      </div>
    </div>
  );
}
