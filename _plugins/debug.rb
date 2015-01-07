require 'cgi'

module Jekyll
  module Debug
    def debug(val)
      "<div style='padding:20px; margin: 20px; background-color: orange; color:black; line-height:10px;  font-size: 14px;'>
        #{CGI.escapeHTML(val.to_s)}
      </div>"
    end
  end
end
Liquid::Template.register_filter(Jekyll::Debug)
