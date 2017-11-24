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
            this.props.location.pathname == `/` ||
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
                {/*<Navigation pathname={this.props.location.pathname}/>*/}
                <div
                    className={hasSidebar ? `has-sidebar` : ``}
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
                        }}>
                        <div
                            css={{
                                ...sidebarStyles,
                                display: `block`,
                            }}
                        >
                            <div>
                                <header css={{
                                    borderBottom: `none`,
                                    height: `auto`,
                                    lineHeight: `30px`,
                                    marginLeft: `50px`,
                                    padding: `30px 0`,
                                    width: `100%`,
                                }}>
                                    <div>
                                        <a css={{
                                            backgroundImage: `url('data:image/jpeg;base64,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')`,
                                            backgroundSize: `100% 100%`,
                                            borderRadius: `50%`,
                                            display: `block`,
                                            height: `160px`,
                                            width: `160px`,
                                        }} href="#"></a>
                                        <h1><a href="#">Jolly Zhao</a></h1>
                                        <p>我是一只小小小小小小菜鸟</p>
                                    </div>
                                </header>
                            </div>
                        </div>
                        <div
                            css={{
                                left: 0,
                                [presets.Tablet]: {
                                    paddingLeft: hasSidebar ? rhythm(12) : 0,
                                    paddingRight: hasSidebar ? rhythm(2) : 0,
                                },
                                [presets.Desktop]: {
                                    paddingLeft: hasSidebar ? rhythm(14) : 0,
                                    paddingRight: hasSidebar ? rhythm(2) : 0,
                                },
                            }}
                        >
                            <div className={`main-body`}>
                                {this.props.children()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = DefaultLayout
