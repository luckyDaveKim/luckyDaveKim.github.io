import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import * as _ from 'lodash';
import { lighten, setLightness } from 'polished';
import GoogleAdsense from 'react-adsense-google';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Footer } from '../components/Footer';
import SiteNav, { SiteNavMain } from '../components/header/SiteNav';
import PostContent from '../components/PostContent';
import { ReadNext } from '../components/ReadNext';
import { Subscribe } from '../components/subscribe/Subscribe';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteMain } from '../styles/shared';
import config from '../website-config';
import Comment from '../components/Comment';

interface PageTemplateProps {
  location: Location;
  data: {
    logo: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        image: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        excerpt: string;
        tags: string[];
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
            date: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    excerpt: string;
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
  };
}

const PageTemplate = ({ data, pageContext, location }: PageTemplateProps) => {
  const post = data.markdownRemark;
  const date = new Date(post.frontmatter.date);
  // 1991-03-26
  const datetime = format(date, 'yyyy-MM-dd', { locale: ko });
  // 1991년 03월 26일
  const displayDatetime = format(date, 'yyyy년 MMM do', { locale: ko });

  return (
    <IndexLayout className="post-template">
      <Wrapper css={PostTemplate}>
        <header className="site-header">
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isPost post={post.frontmatter} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            {/* TODO: no-image css tag? */}
            <article css={PostFull}>
              <PostFullHeader className="post-full-header">
                <PostFullTags className="post-full-tags">
                  {post.frontmatter.tags?.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/tags/${_.kebabCase(tag)}/`}
                    >
                      #{tag}
                    </Link>
                  ))}
                </PostFullTags>
                <PostFullTitle className="post-full-title">{post.frontmatter.title}</PostFullTitle>
                <PostFullCustomExcerpt className="post-full-custom-excerpt">
                  {post.frontmatter.excerpt}
                </PostFullCustomExcerpt>
                <PostFullByline className="post-full-byline">
                  <section className="post-full-byline-content">
                    <section className="post-full-byline-meta">
                      <div className="byline-meta-content">
                        <time className="byline-meta-date" dateTime={datetime}>
                          {displayDatetime}
                        </time>
                        <span className="byline-reading-time">
                          <span className="bull">&bull;</span> {post.timeToRead} min read
                        </span>
                      </div>
                    </section>
                  </section>
                </PostFullByline>
              </PostFullHeader>

              {post.frontmatter.image?.childImageSharp && (
                <PostFullImage>
                  <GatsbyImage
                    style={{ height: '100%' }}
                    image={post.frontmatter.image.childImageSharp.gatsbyImageData}
                    alt={post.frontmatter.title}
                  />
                </PostFullImage>
              )}
              <PostContent htmlAst={post.htmlAst} />

              <GoogleAdsense
                adClient="ca-pub-7933583473323654"
                adSlot="3598572309"
                style={{ 'display': 'block', 'textAlign': 'center' }}
                adLayout="in-article"
                adFormat="fluid"
                fullWidthResponsive="true"
              />

              <Comment />

              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}
            </article>
          </div>
        </main>

        <ReadNext
          currentPageSlug={location.pathname}
          tags={post.frontmatter.tags}
          relatedPosts={data.relatedPosts}
          pageContext={pageContext}
        />

        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

const PostTemplate = css`
  .site-main {
    margin-top: 64px;
    background: #fff;
    padding-bottom: 4vw;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const PostFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 170px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`;

const PostFullTags = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  color: ${colors.midgrey};
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;

  * {
    margin: 0 0.3em;
  }
`;

const PostFullCustomExcerpt = styled.p`
  margin: 20px 0 0;
  color: var(--midgrey);
  font-family: Georgia, serif;
  font-size: 2.3rem;
  line-height: 1.4em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
  }
`;

const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 0;
  padding-top: 15px;
  /* border-top: 1px solid color(var(--lightgrey) l(+10%)); */
  border-top: 1px solid ${lighten('0.1', colors.lightgrey)};

  .post-full-byline-content {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
    font-size: 1.2rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .post-full-byline-meta h4 {
    margin: 0 0 3px;
    font-size: 1.3rem;
    line-height: 1.4em;
    font-weight: 500;
  }

  .post-full-byline-meta h4 a {
    /* color: color(var(--darkgrey) l(+10%)); */
    color: ${lighten('0.1', colors.darkgrey)};
  }

  .post-full-byline-meta h4 a:hover {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }

  @media (prefers-color-scheme: dark) {
    /* border-top-color: color(var(--darkmode) l(+15%)); */
    border-top-color: ${lighten('0.15', colors.darkmode)};

    .post-full-byline-meta h4 a {
      color: rgba(255, 255, 255, 0.75);
    }

    .post-full-byline-meta h4 a:hover {
      color: #fff;
    }
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const PostFullImage = styled.figure`
  margin: 0 -10vw -165px;
  height: 800px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 0 -4vw -100px;
    border-radius: 0;
    img {
      max-width: 1170px;
    }
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;

export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      frontmatter {
        template
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
        excerpt
        image {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 1440
            )
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 5
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PageTemplate;

export function Head({ data, location }: PageTemplateProps) {
  const post = data.markdownRemark;
  let width = '';
  let height = '';
  if (post.frontmatter.image?.childImageSharp) {
    width = String(post.frontmatter.image.childImageSharp.gatsbyImageData.width);
    height = String(post.frontmatter.image.childImageSharp.gatsbyImageData.height);
  }

  return (
    <>
      <title>{post.frontmatter.title}</title>

      <meta name="description" content={post.frontmatter.excerpt || post.excerpt} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.frontmatter.title} />
      <meta property="og:description" content={post.frontmatter.excerpt || post.excerpt} />
      <meta property="og:url" content={config.siteUrl + location.pathname} />
      {post.frontmatter.image?.childImageSharp && (
        <meta
          property="og:image"
          content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.gatsbyImageData.images.fallback?.src}`}
        />
      )}
      <meta property="article:published_time" content={post.frontmatter.date} />
      {/* not sure if modified time possible */}
      {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
      {post.frontmatter.tags?.map((tag, index) => (
        <meta
          key={index}
          property="article:tag"
          content={tag} />
      ))}

      {config.facebook && <meta property="article:publisher" content={config.facebook} />}
      {config.facebook && <meta property="article:author" content={config.facebook} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.frontmatter.title} />
      <meta name="twitter:description" content={post.frontmatter.excerpt || post.excerpt} />
      <meta name="twitter:url" content={config.siteUrl + location.pathname} />
      {post.frontmatter.image?.childImageSharp && (
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.gatsbyImageData.images.fallback?.src}`}
        />
      )}
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:label2" content="Filed under" />
      {config.twitter && (
        <meta
          name="twitter:site"
          content={`@${config.twitter.split('https://twitter.com/')[1]}`}
        />
      )}
      {config.twitter && (
        <meta
          name="twitter:creator"
          content={`@${config.twitter.split('https://twitter.com/')[1]}`}
        />
      )}
      {width && <meta property="og:image:width" content={width} />}
      {height && <meta property="og:image:height" content={height} />}
    </>
  );
}
