#!/bin/bash
# Stamp all asset references in index.html with the current git commit hash.
# Run before pushing: ./cachebust.sh
# Idempotent: strips any existing ?v= params before adding the new one.

set -e
cd "$(dirname "$0")"

HASH=$(git rev-parse --short HEAD)
echo "Cache-busting with commit: $HASH"

# Replace ?v=anything with ?v=$HASH on css/js references in index.html
sed -i -E "s/(style\.css)\?v=[^\"]*/\1?v=$HASH/" index.html
sed -i -E "s/(mandala3d\.js)\?v=[^\"]*/\1?v=$HASH/" index.html

# Also add cache-bust to module imports inside mandala3d.js
# These are the local module imports that browsers cache aggressively
sed -i -E "s/(from '\.\/(ontology|genesis|gyroParallaxSubsystem)\.js)(\?v=[^']*)?'/\1?v=$HASH'/g" mandala3d.js

# Stamp the service worker cache version
sed -i -E "s/const CACHE_VERSION = '[^']*'/const CACHE_VERSION = 'fm3d-$HASH'/" sw.js

echo "Done. All assets + SW stamped with $HASH"
