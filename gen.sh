npx dts-bundle-generator $1.ts -o $1.d.ts \
  --external-inlines=$2  --inline-declare-externals --export-referenced-types false --no-banner