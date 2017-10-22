import React from 'react'
import Link from 'gatsby-link'
import Typography from 'typography'

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.中文汉字</p>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage
