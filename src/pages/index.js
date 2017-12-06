import React from "react"
import Link from 'gatsby-link'
import g from "glamorous"

import { rhythm } from "../utils/typography"

export default ({ data }) => {
    return (
        <div>
            {data.allMarkdownRemark.edges.map(({ node }) =>
                <div key={node.id}>
                    <g.H3 marginBottom={rhythm(1 / 4)}>
                        <Link to={node.fields.slug}>{node.frontmatter.title}{" "}</Link>
                        <g.Span color="#BBB">— {node.frontmatter.date}</g.Span>
                    </g.H3>
                    <p>
                        {node.excerpt}
                    </p>
                    <hr/>
                </div>
            )}
        </div>
    )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
        homeCity
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
            id
            fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`