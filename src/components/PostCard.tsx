import { format } from 'date-fns';
import { ko } from 'date-fns/locale'
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { lighten } from 'polished';
import React from 'react';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../styles/colors';
import { PageContext } from '../templates/post';

export interface PostCardProps {
  post: PageContext;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const date = new Date(post.frontmatter.date);
  // 1991-03-26
  const datetime = format(date, 'yyyy-MM-dd', {locale: ko});
  // 1991년 03월 26일
  const displayDatetime = format(date, 'yyyy년 MMM do', {locale: ko});

  return (
    <article
      className={`post-card ${post.frontmatter.image ? '' : 'no-image'}`}
      css={PostCardStyles}
    >
      {post.frontmatter.image && (
        <Link className="post-card-image-link" css={PostCardImageLink} to={post.fields.slug}>
          <PostCardImage className="post-card-image">
            {post.frontmatter?.image?.childImageSharp?.fluid && (
              <Img
                alt={`${post.frontmatter.title} cover image`}
                style={{ height: '100%' }}
                fluid={post.frontmatter.image.childImageSharp.fluid}
              />
            )}
          </PostCardImage>
        </Link>
      )}
      <PostCardContent className="post-card-content">
        <Link className="post-card-content-link" css={PostCardContentLink} to={post.fields.slug}>
          <PostCardHeader className="post-card-header">
            <PostCardTags>
              {post.frontmatter.tags?.map(tag => {
                return (
                  <PostCardTag key={tag} className="post-card-primary-tag">
                    #{tag}
                  </PostCardTag>
                );
              })}
            </PostCardTags>
            <PostCardTitle className="post-card-title">{post.frontmatter.title}</PostCardTitle>
          </PostCardHeader>
          <PostCardExcerpt className="post-card-excerpt">
            <p>{post.frontmatter.excerpt || post.excerpt}</p>
          </PostCardExcerpt>
        </Link>
        <PostCardMeta className="post-card-meta">
          <PostCardBylineContent className="post-card-byline-content">
            <span>{post.timeToRead} min read</span>
            <time dateTime={datetime}>{displayDatetime}</time>
          </PostCardBylineContent>
        </PostCardMeta>
      </PostCardContent>
    </article>
  );
};

export const PostCardStyles = css`
  position: relative;
  flex: 1 1 301px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  min-height: 220px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  border-radius: 5px;
  border-bottom: 1px solid ${lighten('0.12', colors.lightgrey)};
  background-color: #fff;
  background-size: cover;

  :hover .post-card-image {
    transition: all 0.5s ease;
    transform: translate3D(0, -1px, 0) scale(1.1);
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${colors.darkgrey};
    border-bottom-color: ${lighten('0.08', colors.darkmode)};
    box-shadow: ${lighten('0.06', colors.darkgrey)} 8px 14px 38px, ${lighten('0.03', colors.darkgrey)} 1px 3px 8px;
  }
`;

const PostCardImageLink = css`
  position: relative;
  display: block;
  overflow: hidden;
`;

const PostCardImage = styled.div`
  width: auto;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
  transition: all 0.5s ease;
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PostCardContentLink = css`
  position: relative;
  display: block;
  padding: 0 25px 0;
  flex-grow: 1;
  /* color: var(--darkgrey); */
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`;

const PostCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PostCardTag = styled.span`
  line-height: 1em;
  margin: 0 0.3em;
  /* color: var(--blue); */
  color: ${colors.blue};
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

const PostCardTitle = styled.h2`
  margin: 0 0 0.4em;
  line-height: 1.15em;
  transition: color 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const PostCardExcerpt = styled.section`
  font-family: Georgia, serif;

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)} !important;
  }
`;

const PostCardMeta = styled.footer`
  display: flex;
  align-items: flex-start;
  padding: 0 25px 25px;
`;

const PostCardBylineContent = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  color: ${lighten('0.1', colors.midgrey)};
  font-size: 1.2rem;
  line-height: 1.4em;
  font-weight: 400;
  letter-spacing: 0.2px;
  text-transform: uppercase;

  * {
    margin-left: auto;
  }

  @media (prefers-color-scheme: dark) {
    a {
      color: rgba(255, 255, 255, 0.75);
    }
  }
`;

const PostCardHeader = styled.header`
  margin: 15px 0 0;
`;
