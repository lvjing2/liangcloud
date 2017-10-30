import React from "react"
import Link from "gatsby-link"
import typography, { rhythm, scale } from "../utils/typography"
import presets from "../utils/presets"

const navItemStyles = {
    ...scale(-1 / 3),
    boxSizing: `border-box`,
    display: `inline-block`,
    color: `inherit`,
    textDecoration: `none`,
    textTransform: `uppercase`,
    letterSpacing: `0.03em`,
    lineHeight: `calc(${presets.headerHeight} - 4px`,
    padding: `4px ${rhythm(0.5)} 0`,
    position: `relative`,
    top: 0,
    transition: `color .15s ease-out`,
    "&:hover": {
        opacity: 0.8,
    },
};

const NavItem = ({ linkTo, children }) => (
    <li
        css={{
            display: `inline-block`,
            margin: 0,
        }}
    >
        <Link to={linkTo} css={navItemStyles}>
            {children}
        </Link>
    </li>
);

export default ({ pathname }) => {
    const isHomepage = pathname == `/`
    const isBlog = pathname == `/blog/`
    let styles = {}
    if (isHomepage) {
        styles.backgroundColor = `rgba(255,255,255,0)`
        styles.borderBottomColor = `transparent`
        styles[presets.Tablet] = {
            position: isHomepage || isBlog ? `absolute` : `fixed`,
        }
    }
}
