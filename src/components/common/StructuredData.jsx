const StructuredData = ({ data }) => {
  if (!data) return null

  const payloads = Array.isArray(data) ? data : [data]

  return (
    <>
      {payloads.map((item, index) => (
        <script
          key={`${item['@type'] || 'schema'}-${index}`}
          type="application/ld+json"
          data-seo="page"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

export default StructuredData
