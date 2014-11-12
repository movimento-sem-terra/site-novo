module Jekyll
  module Keyword

    def generate_keywords(obj, stdout=false)
      tags = obj['tags']
      return [] unless tags
      result = []
      tags.map do |t|
        result << t.values
      end
      result.flatten.join ', '
    end

  end
end

Liquid::Template.register_filter(Jekyll::Keyword)
