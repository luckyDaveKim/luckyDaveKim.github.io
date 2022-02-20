import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { inner, outer, SiteArchiveHeader, SiteHeader, SiteMain, SiteNavMain } from '../styles/shared';
import { PageContext, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';
import TagsCloud from '../components/TagsCloud';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      background: ${colors.darkmode};
    }
  }
`;

interface TagsPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const Tags: React.FC<TagsPageProps> = props => (
  <IndexLayout>
    <Helmet>
      <title>Tags</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header className='site-archive-header no-image' css={[SiteHeader, SiteArchiveHeader]}>
        <div css={[outer, SiteNavMain]}>
          <div css={inner}>
            <SiteNav isHome={false} />
          </div>
        </div>
      </header>
      <main id='site-main' className='site-main' css={[SiteMain, outer]}>
        <div css={inner}>
          <article className='post page' css={PostFull}>
            <PostFullHeader className='post-full-header'>
              <PostFullTitle className='post-full-title'>Tags</PostFullTitle>
            </PostFullHeader>

            <TagsCloud data={props.data} />
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;

export default Tags;
