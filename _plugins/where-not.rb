module Jekyll
  module WhereNot
    def where_not(hash, key, value, stdout=false)
      return [] if hash.nil? 
      hash.select do |x| 
        x[key] != value 
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::WhereNot)
