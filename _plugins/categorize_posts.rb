
module Jekyll
  class CategorizeLoader < Generator
    safe true

    def generate(site)
      @all_articles = site.posts
      @newest_post = @all_articles.docs.sort { |a, b| b <=> a }[0..1000]
      musicoteca  = find 'musicoteca', 'section', 50
      musicoteca_albuns = musicoteca.select{ |m| m.data['type'] == 'album' }
      musicoteca_tape = musicoteca.select{ |m| m.data['type'] == 'tape' }
      musicoteca_partners = musicoteca.select{ |m| m.data['type'] == 'partner' }

      boletim = find('boletim').first
      cover = find('cover').first
      tv_mst = find('tv').slice(0,5)
      newspapers = find('newspaper', 'section', 1)

      campaigns = find('campaign')
      carousel = @newest_post.slice!(0,5) # the first five posts goes on carousel

      special_stories = find('special-stories', 'label', 2, carousel)
      recent = @newest_post.delete_at(0) # the sixth post goes on recent

      if campaigns.size < 1
        featured_news = find('featured-news').slice(0,3)
      else
        featured_news = find('featured-news').slice(0,2)
      end


      articles = find 'articles', 'label'
      interviews = find 'interviews', 'label'
      musicoteca_videos = @all_articles.docs.select{ |v| v.data['section'] == 'tv'  && v.data['sector'] == 'culture' }

      site.config['musicoteca'] = {}
      site.config['musicoteca']['videos'] = musicoteca_videos
      site.config['musicoteca']['albuns'] = musicoteca_albuns
      site.config['musicoteca']['partners'] = musicoteca_partners
      site.config['musicoteca']['tape'] = musicoteca_tape

      site.config['cover'] = cover
      site.config['articles'] = articles
      site.config['carousel'] = carousel
      site.config['recent'] = recent
      site.config['featured_news'] = featured_news
      site.config['interviews'] = interviews || []
      site.config['tv_mst'] = tv_mst
      site.config['special_stories'] = special_stories
      site.config['campaigns'] = campaigns
      site.config['newspaper'] = newspapers.first
      site.config['boletim'] = boletim
      site.config['others'] = @newest_post
    end

    def find value, field = 'section', minimum = 0, except = []
      result = filter_with_except(value, field, @newest_post, except)
      if result.size < minimum
        result = filter_with_except(value, field, @all_articles.docs, except)
      end

      result.sort! { |a, b| b <=> a }
      @newest_post = @newest_post - result
      result
    end

    def filter_with_except value, field, collection, except = []
      collection.select do |post|
        field_value = post.data[field] == value
        item_id = except.select do |item|
          item.id == post.id
        end

        field_value && item_id.size == 0
      end
    end
  end

end
