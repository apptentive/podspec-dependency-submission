require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "apptentive-fake-plugin"
  s.version      = "1.2.3"
  s.summary      = "A fake plugin that doesn't exist"
  s.homepage     = "https://www.example.com"
  s.license      = "MIT"
  s.authors      = "frank.schmitt@alchemer.com"

  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://github.com/apptentive/apptentive-fake-plugin.git", :tag => "v#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency 'ApptentiveKit', '~> 6.2.0'
end
