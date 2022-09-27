module.exports = {
  siteMetadata: {
    title: `Maine Labor Mural`,
    siteUrl: `https://www.yourdomain.tld`
  },
  pathPrefix: `/maine-labor-mural`,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        "trackingId": "G-GQ109QB6QE"
      }
    },
  ]
};