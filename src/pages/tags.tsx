import React from 'react';
import {Helmet} from 'react-helmet';
import ReactWordcloud from 'react-wordcloud';
import {graphql, navigate} from 'gatsby';
import * as _ from 'lodash';
import {css} from '@emotion/core';

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
  const tags = _.chain(props.data.allMarkdownRemark.edges)
    .flatMap(edge => _.castArray(_.get(edge, 'node.frontmatter.tags', [])))
    .groupBy()
    .map((v, k) => ({'text': `#${k.toUpperCase()}`, 'value': v.length }))
    .value()
    .sort((a, b) => b.value - a.value)
    .slice(0, 25);

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
                  colors: _.map(colors),
                  deterministic: false,
                  enableTooltip: false,
                  fontSizes: [24, 36],
                  fontFamily: 'impact',
                  padding: 1,
                  rotations: 3,
                  rotationAngles: [0, 90],
                  scale: 'log',
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
