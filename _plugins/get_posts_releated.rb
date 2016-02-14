module Jekyll
  module GetPostsReleated
    def get_posts_releated(post, site_posts, limit, stdout=false)
      return [] if post.nil? || site_posts.nil?
      return [] if post['releated_posts'].nil? || post['releated_posts'].size <= 0
      releated_posts = post['releated_posts'][0..limit]

      site_posts.select do |p|
        releated_posts.include? p.name
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::GetPostsReleated)
