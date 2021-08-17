import { graphql, StaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import { css } from '@emotion/react';

import config from '../../website-config';

interface SiteNavLogoProps {
  logo?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

const SubscribeLogo = () => (
  <StaticQuery
    query={graphql`
      query SubscribeOverlayLogo {
        logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              width: 500
            )
          }
        }
      }
    `}
    render={(data: SiteNavLogoProps) => {
      if (!data.logo) {
        return;
      }

      return (
        <GatsbyImage
          css={SubscribeOverlayLogo}
          className="subscribe-overlay-logo"
          image={data.logo.childImageSharp.gatsbyImageData}
          alt={config.title}
        />
      );
    }}
  />
);

const SubscribeOverlayLogo = css`
  position: fixed;
  top: 23px;
  left: 30px;
  height: 30px;
`;

export default SubscribeLogo;
