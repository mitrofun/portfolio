require 'compass/import-once/activate'
require 'susy'
require 'breakpoint'
require 'font-awesome-sass'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "src/"
css_dir = "src/css"
sass_dir = "src/sass"
images_dir = "src/img"
javascripts_dir = "src/js"
fonts_dir = "src/fonts"
generated_images_dir = "src/img/sprite"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

output_style = :expanded
sourcemap = true

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

