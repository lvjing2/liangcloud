import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import presets from "../utils/presets"
import typography, {rhythm, scale} from "../utils/typography"

import Navigation from "../components/navigation"

import './index.css'

// const Header = () => (
//   <div
//     style={{
//       background: 'rebeccapurple',
//       marginBottom: '1.45rem',
//     }}
//   >
//     <div
//       style={{
//         margin: '0 auto',
//         maxWidth: 960,
//         padding: '1.45rem 1.0875rem',
//       }}
//     >
//       <h1 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{
//             color: 'white',
//             textDecoration: 'none',
//           }}
//         >
//           Gatsby
//         </Link>
//       </h1>
//     </div>
//   </div>
// );

const ListLink = props =>
    <li style={{display: 'inline-block', marginRight: '1rem'}}>
        <Link to={props.to}>{props.children}</Link>
    </li>;

const Header = styled.header`
    position: fixed; 
    background-color: rgba(255,255,255,0.975);
    border-bottom: 1px solid #f6f2f8;
    height: 3.5rem;
    z-index: 1;
    left: 0;
    right: 0;
`;

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
        defaultTitle={`GatsbyJS`} titleTemplate={`%s | GatsbyJS`}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
      {/*<Navigation pathname="/" />*/}
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
        <Header>
            <Link to="/"
                css={{
                    color: `inherit`,
                    display: `inline-block`,
                    textDecoration: `none`,
                    marginRight: rhythm(0.5),
                }}>
                <img
                    src=""
                    css={{
                        display: `inline-block`,
                        height: rhythm(1.2),
                        width: rhythm(1.2),
                        margin: 0,
                        marginRight: rhythm(2 / 4),
                        verticalAlign: `middler`,
                    }}
                    alt=""
                />
                <h1
                 css={{
                     ...scale(2/5),
                     display: `inline-block`,
                     margin: 0,
                     verticalAlign: `middle`,
                 }}
                >Jolly</h1>
            </Link>
            <ul
                css={{
                    display: `none`,
                    [presets.Tablet]: {
                        display: `block`,
                        margin: 0,
                        padding: 0,
                        listStyle: `none`,
                    },
                }}>
                <ListLink to='/'>Home</ListLink>
                <ListLink to='/about'>About</ListLink>
                <ListLink to='/contact'>Contact</ListLink>
            </ul>
        </Header>
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
