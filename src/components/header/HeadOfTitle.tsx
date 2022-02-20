import React from 'react';
import {
  inner,
  outer,
  ResponsiveHeaderBackground,
  SiteArchiveHeader,
  SiteDescription,
  SiteHeader,
  SiteHeaderBackground,
  SiteHeaderContent,
  SiteNavMain,
  SiteTitle,
} from '../../styles/shared';
import SiteNav from './SiteNav';

interface Props {
  backgroundImageSrc?: string;
  title: string;
  subTitle: string;
}

const HeadOfTitle: React.FC<Props> = ({ backgroundImageSrc, title, subTitle }) => {
  return (
    <header
      className="site-archive-header"
      css={[SiteHeader, SiteArchiveHeader]}
    >
      <div css={[outer, SiteNavMain]}>
        <div css={inner}>
          <SiteNav isHome={false} />
        </div>
      </div>
      <ResponsiveHeaderBackground
        css={[outer, SiteHeaderBackground]}
        backgroundImage={backgroundImageSrc}
        className="site-header-background"
      >
        <SiteHeaderContent css={inner} className="site-header-content">
          <SiteTitle className="site-title">{title}</SiteTitle>
          <SiteDescription className="site-description">{subTitle}</SiteDescription>
        </SiteHeaderContent>
      </ResponsiveHeaderBackground>
    </header>
  );
};

export default HeadOfTitle;
