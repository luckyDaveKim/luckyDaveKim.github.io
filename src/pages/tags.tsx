import React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { inner, outer, SiteMain } from '../styles/shared';
import { PageContext, PostFull } from '../templates/post';
import { colors } from '../styles/colors';
import TagsCloud from '../components/TagsCloud';
import HeadOfTitle from '../components/header/HeadOfTitle';

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
    <Wrapper css={PageTemplate}>
      <HeadOfTitle
        title={'Tags'}
        subTitle={'A collection of tags'} />
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={PostFull}>
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
      sort: { frontmatter: { date: DESC } }
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

export function Head() {
  return (
    <>
      <title>Tags</title>
    </>
  );
}
