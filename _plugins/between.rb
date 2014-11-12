module Jekyll
  module Between

    def between(obj, from, to=-1, stdout=false)
      arr = Array(obj).flatten
      if to == -1
        arr[from..(arr.size-1)]
      else
        arr[from..to]
      end
    end

  end
end

Liquid::Template.register_filter(Jekyll::Between)
