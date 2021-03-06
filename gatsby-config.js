module.exports = {
    siteMetadata: {
        title: `量子云`,
        siteUrl: `http:www.liangcloud.cn`,
        description: `我只是一团量子云而已`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/post/`,
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography.js`,
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-glamor`,
        `gatsby-plugin-sitemap`,
    ],
};
