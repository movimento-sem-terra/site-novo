
module Jekyll
  module ImageFromTagExtractor

    def extract_image_from_post_tag(site, post, stdout=false)
      menu_tag = post['tags'].find{ |tag| tag['menu'] }
      return '' unless menu_tag
      post_tag = menu_tag['menu']
      page_tag = site['pages'].find{ |page| page['tag'] == post_tag }
      return page_tag ? page_tag['images_hd'] : ''
    end

  end
end 

Liquid::Template.register_filter(Jekyll::ImageFromTagExtractor)
