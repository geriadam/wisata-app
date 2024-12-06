export const useMeta = (propertyData) => {
  const { id, slug, name, name_suffix, catalog } = propertyData
  const route = useRoute();
  const metaDescription = `Book the best deals on ${name}, from 4 – 8 Mar 2025, only in Wisata App!`
  const ogImage = catalog.hero_image_url.lg

  useHead({
    title: `${name} · Member Only Hotel Deals · Wisata App`,
    meta: [
      { name: 'description', content: metaDescription },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Wisata App' },
      { hid: 'og:url', property: 'og:url', content: route.fullPath },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: `${name} · Member Only Hotel Deals · Wisata App` },
      { hid: 'og:description', property: 'og:description', content: metaDescription },
      { hid: 'og:image', property: 'og:image', content: ogImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${name} · Member Only Hotel Deals · Wisata App` },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: ogImage },
    ],
    script: [
      {
        hid: 'json-schema',
        type: 'application/ld+json',
        children: {
          '@context': 'http://schema.org',
          '@type': 'Hotel',
          'name': name,
          'address': {
            '@type': 'PostalAddress',
            'addressRegion': `${catalog.city}, ${catalog.star_rating} Stars, ${catalog.country_code}`,
          },
          'image': ogImage,
          'logo': ogImage,
          'starRating': catalog.star_rating,
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': catalog.review_rating,
            'reviewCount': catalog.review_count,
          },
        },
      },
    ],
  })
}