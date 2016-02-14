module Jekyll
  module WhereNot
    def where_not(hash, key, *value)
      return [] if hash.nil?
      value = [value].flatten.compact
      hash.select do |x|
        !value.include?(x.data[key])
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::WhereNot)
