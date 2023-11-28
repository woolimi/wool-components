#!/bin/bash

html_file="./github-pages/index.html"
tmp_file="./github-pages/index.tmp"

# Remove the specific lines from the HTML file
sed '/<link rel="icon" type="undefined" href="\/wool-components\/favicon.ico" \/>/d; /<meta name="description" content=""/d' $html_file > $tmp_file

# Step 2: Add the additional meta tags before the </head> tag
awk '/<\/head>/ {print "  <meta name=\"robots\" content=\"all\">"; \
                 print "  <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/wool-components/apple-touch-icon.png\">"; \
                 print "  <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/wool-components/favicon-32x32.png\">"; \
                 print "  <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/wool-components/favicon-16x16.png\">"; \
                 print "  <link rel=\"manifest\" href=\"/wool-components/site.webmanifest\">"; \
                 print "  <link rel=\"mask-icon\" href=\"/wool-components/safari-pinned-tab.svg\" color=\"#5bbad5\">"; \
                 print "  <link rel=\"canonical\" href=\"https://woolimi.github.com/wool-components/\">"; \
                 print "  <meta name=\"description\" content=\"Fxxking noisy (but cute) Vue UI components\">"; \
                 print "  <meta property=\"og:site_name\" content=\"Wool Components\">"; \
                 print "  <meta property=\"og:image\" content=\"https://images.prismic.io/woolimi/7587747f-e1f7-454f-8226-222a945c7f33_wool+components.png?q=80&w=540\">"; \
                 print "  <meta property=\"og:title\" content=\"Wool Components\">"; \
                 print "  <meta property=\"og:description\" content=\"Fxxking noisy (but cute) Vue UI components\">"; \
                 print "  <meta property=\"og:url\" content=\"https://woolimi.github.com/wool-components/\">"; \
                 print "  <meta property=\"og:type\" content=\"website\">"; \
                 print "  <meta name=\"twitter:card\" content=\"summary_large_image\">"; \
                 print "  <meta name=\"twitter:title\" content=\"Wool Components\">"; \
                 print "  <meta name=\"twitter:description\" content=\"Fxxking noisy (but cute) Vue UI components\">"; \
                 print "  <meta name=\"twitter:image\" content=\"https://images.prismic.io/woolimi/7587747f-e1f7-454f-8226-222a945c7f33_wool+components.png?q=80&w=540\">"; \
                 next} {print}' $tmp_file > $html_file
