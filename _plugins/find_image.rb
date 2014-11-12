module Jekyll
  module FindImage
    def find_image(post, size='', stdout=false)
      key = "images_hd"
      result =(post[key].nil? || post[key].empty?) ? get_image_from(post['content']) : post[key]
      return "" unless result

      if size == 'hd'
        result.gsub /_b\.jpg/, '_n.jpg'
      elsif size == 'tiny'
        result.gsub /_b\.jpg/, '_t.jpg'
      else
        result
      end
    end

    private

    def get_image_from body
      match = body.to_s.match(/\<img[^\>]*src=[\"\'](?<src>[^\"\']+)/)
      match && Array(match.captures).flatten.first
    end
  end
end 

Liquid::Template.register_filter(Jekyll::FindImage)
