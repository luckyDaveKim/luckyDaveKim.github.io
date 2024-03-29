import { graphql, Link, useStaticQuery } from 'gatsby';
import { css } from '@emotion/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import config from '../../website-config';

interface SiteNavLogoProps {
  logo?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

export const SiteNavLogo = () => {
  const data: SiteNavLogoProps = useStaticQuery(graphql`
    query HeadingQuery {
      logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            width: 500
          )
        }
      }
    }
  `);

  return (
    <Link className="site-nav-logo" css={SiteNavLogoStyles} to="/">
      {data.logo ? (
        <GatsbyImage image={data.logo.childImageSharp.gatsbyImageData} alt={config.title} />
      ) : (
        config.title
      )}
    </Link>
  );
};

const SiteNavLogoStyles = css`
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  display: inline-block;
  margin-right: 32px;
  padding: 12px 0;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1.8rem;
  font-weight: bold;
  letter-spacing: -0.5px;
  text-transform: none;

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 21px;
  }
`;

