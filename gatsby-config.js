module.exports = {
    siteMetadata: {
        title: `量子云`,
        siteUrl: `http:www.liangcloud.cn`,
        description: `我只是一团量子云而已`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography.js`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/post/`,
            },
        },
        `gatsby-plugin-glamor`,
    ],
};
