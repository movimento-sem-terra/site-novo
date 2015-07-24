# encoding: utf-8
#
require 'json'

module Jekyll
  class JSONGenerater < Generator
    priority :low
    safe true

    def generate(site)
      data = []
      site.posts.reverse.each_with_index do |post, i|
        data << {
          'year' =>  post.date.strftime("%Y"),
          'month' =>  post.date.strftime("%m"),
          'date' => post.date.strftime("%FT%T"),
          'title' => post.title,
          'link' => "#{site.config['url']}#{post.url}",
          'tags' => Array(post.data['tags']).flatten.map{ |tag| tag['tag'] },
          'support_line' => post.data['support_line']
        }
      end

      File.open('_site/noticias.json', "w") do |csv|
        opa = []
        data.each do |hash|
          opa << hash.to_json
        end
        csv.write opa.uniq.to_json
      end
    end
  end
end
