
module Jekyll
  module ImageFromTagExtractor

    def extract_image_from_post_tag(site, post, stdout=false)
      'http://farm8.staticflickr.com/7523/16317327392_4894dc582f_b.jpg'
    end

  end
end 

Liquid::Template.register_filter(Jekyll::ImageFromTagExtractor)
