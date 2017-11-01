import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import presets from "../utils/presets"
import colors from "../utils/colors"

import SidebarBody from "../components/sidebar-body"

import typography, {rhythm, scale} from "../utils/typography"

import Navigation from "../components/navigation"

class DefaultLayout extends React.Component {
    render() {
        const isHomepage = this.props.location.pathname == `/`
        const hasSidebar =
            this.props.location.pathname.slice(0, 6) == `/docs/` ||
            this.props.location.pathname.slice(0, 10) == `/packages/` ||
            this.props.location.pathname.slice(0, 10) == `/tutorial/` ||
            this.props.location.pathname.slice(0, 9) == `/features`
        const sidebarStyles = {
            borderRight: `1px solid ${colors.b[0]}`,
            backgroundColor: presets.sidebar,
            boxShadow: `inset 0 4px 5px 0 rgba(116, 76, 158, ${presets.shadowKeyPenumbraOpacity}), inset 0 1px 10px 0 rgba(${presets.shadowColor}, ${presets.shadowAmbientShadowOpacity}), inset 0 2px 4px -1px rgba(${presets.shadowColor}, ${presets.shadowKeyUmbraOpacity})`,
            width: rhythm(10),
            display: `none`,
            position: `fixed`,
            top: `calc(${presets.headerHeight} - 1px)`,
            overflowY: `auto`,
            zIndex: 1,
            height: `calc(100vh - ${presets.headerHeight} + 1px)`,
            WebkitOverflowScrolling: `touch`,
            "::-webkit-scrollbar": {
                width: `6px`,
                height: `6px`,
            },
            "::-webkit-scrollbar-thumb": {
                background: presets.lightPurple,
            },
            "::-webkit-scrollbar-track": {
                background: presets.brandLighter,
            },
            [presets.Desktop]: {
                width: rhythm(12),
                padding: rhythm(1),
            },
        }

        return (
            <div>
                <Helmet defaultTitle={`GatsbyJS`} titleTemplate={`%s | GatsbyJS`}
                    meta={[
                        {name: 'description', content: 'Sample'},
                        {name: 'keywords', content: 'sample, something'},
                    ]}
                />
                <Navigation pathname={this.props.location.pathname}/>
                <div
                    className={hasSidebar ? `main-body has-sidebar` : `main-body`}
                    css={{
                        paddingTop: 0,
                        [presets.Tablet]: {
                            margin: `0 auto`,
                            paddingTop: isHomepage ? 0 : presets.headerHeight,
                        },
                    }}
                >
                    <div
                        css={{
                            [presets.Tablet]: {
                                paddingLeft: hasSidebar ? rhythm(10) : 0,
                            },
                            [presets.Desktop]: {
                                paddingLeft: hasSidebar ? rhythm(12) : 0,
                            },
                        }}
                    >
                        {this.props.children()}
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = DefaultLayout
