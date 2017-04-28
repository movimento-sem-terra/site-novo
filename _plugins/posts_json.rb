require 'json'
require_relative './get_video_embeded'

module Jekyll
  module PostsJSON
    include Jekyll::VideoEmbeded

    def generate_json(obj, limit=-1, stdout=false)
       array = Array(obj)[0..limit].flatten

       array.map do |post|
        result = {
          title: post.data['title'],
          url: post.url,
          date: post.data['date'],
          support_line: post.data['support_line']
        }

        if not post.data['images_hd'].nil?
          result[:cover] = post.data['images_hd']
        else
          result[:video] = get_video_embeded(post.data['video'])
        end

        result
      end.to_json
    end

  end
end

Liquid::Template.register_filter(Jekyll::PostsJSON)
