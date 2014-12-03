
module Jekyll
  class CategorizeLoader < Generator
    safe true

    def generate(site)
      @all_articles = site.posts
      @newest_post = @all_articles.sort { |a, b| b <=> a }[0..300]
      cover = find "cover"
      tv_mst = find 'tv'
      campaigns = find 'campaign'

      carousel = @newest_post.slice!(0,5) # the first five posts goes on carousel

      special_stories = find "special-stories", "label", 2, carousel
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
      site.config['tv_mst'] = tv_mst.slice(0,6)
      site.config['special_stories'] = special_stories
      site.config['campaigns'] = campaigns.slice(0,3)
      site.config['others'] = @newest_post

    end

    def find value, field = "section", minimum = 0, except = []
      result = filter_with_except(value, field, @newest_post, except)
      if result.size < minimum
        result = filter_with_except(value, field, @all_articles, except)
      end
      result.sort! { |a, b| b <=> a }
      @newest_post = @newest_post - result
      result
    end
    def filter_with_except value, field, collection, except = []
      result = collection.select do |post|
        post.data[field] == value && except.select{ |item| item.id==post.id }.size == 0
      end
      result
    end
  end

end
