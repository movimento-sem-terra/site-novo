require 'jekyll/post'
require 'json'
require 'slugify'

module Jekyll
  class TagsFileGenerator < Generator
    priority :lowest

    def generate(site)
      tags = Hash.new

      site.posts.each do |post|
        post.tags.each do |tag|
          key = tag.values.first

          if tags[key].class == Array
            tags[key] << post.name.slugify
          else
            tags[key] = [post.name]
          end
        end
      end

      File.open('tags.json','w') do |f|
        f.write(tags.to_json)
      end

      site.static_files << Jekyll::StaticFile.new(site,site.source,'','tags.json')
    end
  end
end
