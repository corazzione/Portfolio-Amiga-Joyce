import { RevealWrapper } from '@/components/motion/RevealWrapper'
import { blogPosts } from '@/lib/data'

export function BlogSection() {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-switzer text-4xl font-bold tracking-tight mb-12">
          Ultimas Historias
        </h2>
        <div>
          {blogPosts.map((post, i) => (
            <div key={post.id}>
              {i > 0 && <hr className="border-dark/10" />}
              <RevealWrapper delay={i * 0.1}>
                <div className="py-8">
                  <span className="text-xs font-semibold text-gold uppercase tracking-widest">
                    {post.category}
                  </span>
                  <h3 className="font-switzer text-2xl font-bold mt-2 mb-3 text-dark">
                    {post.title}
                  </h3>
                  <p className="text-dark/60 text-sm leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <time className="text-dark/40 text-xs">{post.date}</time>
                </div>
              </RevealWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
