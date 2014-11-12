module Jekyll
  module WhereNotNull

    def where_not_null(obj, value, stdout=false)
      return [] if obj.nil? 

      obj.select do |x| 
        not (x[value].nil? or x[value].empty?) 
      end
    end

  end
end

Liquid::Template.register_filter(Jekyll::WhereNotNull)
