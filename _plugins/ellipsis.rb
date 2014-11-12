
module Jekyll
  module Ellipsis

    def ellipsis(str, size, stdout=false)
      (str.length > size) ? str[0, size] + "..." : str
    end

  end
end

Liquid::Template.register_filter(Jekyll::Ellipsis)
