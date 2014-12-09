require 'httparty'

module Jekyll
  module VideoEmbeded 

    def get_video_embeded(url, stdout=false)
      if url =~ /youtu/
        get_youtube_embed(url)
      elsif url =~ /vim/
        get_vimeo_embed(url)
      else
        url
      end
    end

    private 
    def get_youtube_embed url
      result = url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/)
      if result && result.captures
         video_id = result.captures.last
         "//www.youtube.com/embed/#{video_id}?autohide=1&showinfo=0"
      end
    end

    # to know more about vimeo API, please see it: http://developer.vimeo.com/apis/oembed
    def get_vimeo_embed url
      result = HTTParty.get "http://vimeo.com/api/oembed.json?url=#{url}"
      result = result.to_hash
      if result 
        "//player.vimeo.com/video/#{result['video_id']}?byline=0&portrait=0&title=0"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::VideoEmbeded)
