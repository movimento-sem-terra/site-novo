n = namespace :test do
  require 'rake/testtask'

  Rake::TestTask.new(:smoke) do |t|
    t.pattern = 'test/smoke/*_test.rb'
    t.verbose = false
    t.warning = false
  end

  Rake::TestTask.new(:integration) do |t|
    t.pattern = 'test/integration/*_test.rb'
    t.verbose = false
    t.warning = false
  end

  Rake::TestTask.new(:unit) do |t|
    t.pattern = 'test/unit/*_test.rb'
    t.verbose = false
    t.warning = false
  end
end

task :test => [n[:unit], n[:integration], n[:smoke]]
task :default => :test
