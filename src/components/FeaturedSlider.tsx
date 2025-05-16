'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function FeaturedSlider({ posts }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      className="rounded-xl overflow-hidden"
    >
      {posts.map(post => (
        <SwiperSlide key={post.id}>
          <div className="relative h-[500px] w-full">
            <Image
              src={post.featuredImage?.sourceUrl || '/images/placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-2">{post.title}</h3>
                <div className="mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                <Link href={`/post/${post.slug}`} className="btn-primary inline-block">
                  자세히 보기
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
