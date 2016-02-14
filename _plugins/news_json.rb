# encoding: utf-8
#
require 'json'

module Jekyll
  class JSONGenerater < Generator
    priority :low

    def generate(site)
      data = []
      site.posts.reverse.each_with_index do |post, i|
        data << {
          'year' =>  post.date.strftime("%Y"),
          'month' =>  post.date.strftime("%m"),
          'date' => post.date.strftime("%FT%T"),
          'title' => post.title,
          'url' => "#{site.config['url']}#{post.url}",
          'tags' => Array(post.data['tags']).flatten.map{ |tag| tag['tag'] },
          'support_line' => post.data['support_line']
        }
      end

      File.open('noticias.json', "w") do |csv|
        opa = []
        data.each do |hash|
          opa << hash.to_json
        end
        csv.write opa.uniq.to_json
      end

      site.static_files << Jekyll::StaticFile.new(site,site.source,'','noticias.json')
    end
  end
end
