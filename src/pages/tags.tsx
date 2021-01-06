import React from 'react';
import {Helmet} from 'react-helmet';
import ReactWordcloud from 'react-wordcloud';
import {graphql, navigate} from 'gatsby';
import * as _ from 'lodash';
import flow from 'lodash/fp/flow';
import flatMap from 'lodash/fp/flatMap';
import map from 'lodash/fp/map';
import groupBy from 'lodash/fp/groupBy';
import sortBy from 'lodash/fp/sortBy';
import slice from 'lodash/fp/slice';
import {css} from '@emotion/react';

import {Footer} from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import {Wrapper} from '../components/Wrapper';
import IndexLayout from '../layouts';
import {inner, outer, SiteArchiveHeader, SiteHeader, SiteMain, SiteNavMain,} from '../styles/shared';
import {PageContext, PostFull, PostFullHeader, PostFullTitle} from '../templates/post';
import {colors} from '../styles/colors';

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

const Tags: React.FC<TagsPageProps> = props => {
  const tags = flow(
    flatMap(({node}) => node.frontmatter.tags),
    groupBy(tag => tag),
    map(tagGroup => ({text: tagGroup[0], value: tagGroup.length})),
    sortBy(word => -word.value),
    slice(0, 80)
  )(props.data.allMarkdownRemark.edges)

  return (
    <IndexLayout>
      <Helmet>
        <title>Tags</title>
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article className="post page" css={PostFull}>
              <PostFullHeader className="post-full-header">
                <PostFullTitle className="post-full-title">Tags</PostFullTitle>
              </PostFullHeader>

              <ReactWordcloud
                words={tags}
                callbacks={{
                  onWordClick: (word) => navigate(`/tags/${_.kebabCase(word.text)}`)
                }}
                options={{
                  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
                  deterministic: false,
                  enableTooltip: false,
                  fontSizes: [8, 40],
                  fontFamily: 'impact',
                  padding: 1,
                  rotations: 3,
                  rotationAngles: [0, 90],
                  scale: 'sqrt',
                  spiral: 'archimedean',
                  transitionDuration: 500,
                }} />
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

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
