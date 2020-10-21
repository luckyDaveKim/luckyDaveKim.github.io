import { Link } from 'gatsby';
import React from 'react';
import _ from 'lodash';
import path from 'path'
import { setLightness } from 'polished';
import { css } from '@emotion/core';

import { colors } from '../styles/colors';

export interface PaginationProps {
  currentPage: number;
  numPages: number;
  pathPrefix: string;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({ currentPage, numPages, pathPrefix }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  // remove single slash for avoid duplicated slash
  const prevPage = currentPage === 2 ? pathPrefix : path.join(pathPrefix, `${currentPage - 1}`);
  const nextPage = path.join(pathPrefix, `${currentPage + 1}`);
  const pagesPerBlock = 5;
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPageIndex = (currentBlock - 1) * pagesPerBlock;
  const endPageIndex = Math.min(numPages, startPageIndex + pagesPerBlock);

  return (
    <>
      {numPages > 1 && (
        <nav css={navCss}>
          <div>
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                {/* << symbol */}
                {String.fromCharCode(171)}
              </Link>
            )}

            {_.range(startPageIndex, endPageIndex)
              .map(i => (
                <Link key={`pagination-number${i + 1}`} className={i + 1 === currentPage ? 'active' : ''} to={path.join(pathPrefix, `${i === 0 ? '' : i + 1}`)}>
                  {i + 1}
                </Link>
              ))}

            {!isLast && (
              <Link to={nextPage} rel="next">
                {/* >> symbol */}
                {String.fromCharCode(187)}
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

const navCss = css`
  text-align: center;
  div {
    display: inline-block;
  }

  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;

    &.active {
      background-color: ${setLightness('0.0015', colors.darkgrey)};
      color: white;
      border-radius: 5px;
    }

    &:hover:not(.active) {
      background-color: #ddd;
      border-radius: 5px;
    }
  }
`;

export default Pagination;
