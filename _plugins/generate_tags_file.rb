require 'jekyll/document'
require 'json'

module Jekyll
  class TagsFileGenerator < Generator
    priority :lowest

    def generate(site)
      tags = Hash.new

      site.posts.docs.last(2000).each do |post|
        post.data['tags'].each do |tag|
          key = tag.values.first.downcase
          value = post.relative_path

          if tags[key].class == Array
            tags[key] << value
          else
            tags[key] = [value]
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
