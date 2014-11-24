module Jekyll
  class CategorizeLoader < Generator
    safe true

    def generate(site)
      @newest_post = site.posts.sort { |a, b| b <=> a }[0..300]
      cover = find "cover"
      tv_mst = find 'tv'
      carousel = @newest_post.slice!(0,5) # the first five posts goes on carousel
      recent = @newest_post.delete_at(0) # the sixth post goes on recent
      featured_news = find 'featured-news'


      articles = find "articles", "label"
      interviews = find 'interviews', "label"

      site.config["cover"] = cover.first
      site.config["articles"] = articles
      site.config["carousel"] = carousel
      site.config["recent"] = recent
      site.config['featured_news'] = featured_news
      site.config['interviews'] = interviews
      site.config['tv_mst'] = tv_mst.first
    end

    def find value, field = "section"
      result = @newest_post.select do |post|
        post.data[field] == value
      end
      @newest_post = @newest_post - result
      result
    end
  end
end
