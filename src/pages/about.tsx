import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

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

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
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
              <PostFullTitle className="post-full-title">About</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <h1 id="interests">Interests</h1>
                <ul>
                  <li>Web</li>
                  <li>Server</li>
                  <li>Back-End</li>
                  <li>Algorithm</li>
                  <li>Front-End</li>
                  <li>DevOps</li>
                  <li>Software Engineering</li>
                </ul>

                <h1 id="technical-skill">Technical Skill</h1>
                <ul>
                  <li>Program Language
                    <ul>
                      <li>Java</li>
                      <li>Node.js</li>
                      <li>JavaScript</li>
                      <li>PHP</li>
                      <li>C++</li>
                    </ul>
                  </li>
                  <li>Framework
                    <ul>
                      <li>Spring Boot</li>
                      <li>Vue.Js</li>
                      <li>Angular2</li>
                      <li>AngularJs</li>
                      <li>Express</li>
                    </ul>
                  </li>
                  <li>Database
                    <ul>
                      <li>OracleDB</li>
                      <li>MongoDB</li>
                      <li>MySQL</li>
                      <li>SQLite</li>
                    </ul>
                  </li>
                  <li>Version Control System
                    <ul>
                      <li>Git</li>
                      <li>SVN</li>
                    </ul>
                  </li>
                  <li>CI / CD
                    <ul>
                      <li>Jenkins</li>
                      <li>Travis CI</li>
                    </ul>
                  </li>
                  <li>DevOps
                    <ul>
                      <li>Docker</li>
                    </ul>
                  </li>
                </ul>

                <h1 id="activities">Activities</h1>
                <h2 id="2019">2019</h2>
                <ul>
                  <li>2017.11.25 ~ :: Working at <strong>AhnLab</strong></li>
                </ul>

                <h2 id="2017">2017</h2>
                <ul>
                  <li>2017.11.01 ~ 2017.11.01 :: Start a <strong>Blog</strong></li>
                  <li>2015.07.20 ~ 2017.10.31 :: Working at <strong>WINS</strong></li>
                </ul>

                <h2 id="2016">2016</h2>
                <ul>
                  <li>2010.03.01 ~ 2016.02.01 :: Graduate from <strong>Gachon University</strong></li>
                </ul>

                <h2 id="2015">2015</h2>
                <ul>
                  <li>2014.05.01 ~ 2015.02.28 :: KT - <strong>Mobile Futurist</strong></li>
                </ul>

                <h2 id="2014">2014</h2>
                <ul>
                  <li>2014.10.17 ~ 2014.12.19 :: App Center - <strong>A-Camp</strong></li>
                  <li>2014.01.06 ~ 2014.02.05 :: Field Placement - <strong>Woonghin Holdings</strong></li>
                </ul>

                <h2 id="2013">2013</h2>
                <ul>
                  <li>2013.07.01 ~ 2013.08.31 :: Language and Culture Immersion Program in <strong>Canada</strong> at <strong>Thompson Rivers University</strong>
                  </li>
                </ul>

                <h1 id="project">Project</h1>
                <ul>
                  <li>2019.05.01 ~ 2019.07.31 :: Partner v4.5 Back-Office Development</li>
                  <li>2019.01.01 ~ 2019.05.31 :: V3 MSS Back-Office Development</li>
                  <li>2018.07.01 ~ 2018.10.31 :: Partner v4.4 Back-Office Development</li>
                  <li>2018.03.01 ~ 2019.05.31 :: Partner v4.3 Back-Office Development</li>
                  <li>2016.10.01 ~ 2017.06.31 :: TMS Solution Web Development</li>
                  <li>2016.04.01 ~ 2016.09.30 :: TMS Solution Quality Control and Common Criteria</li>
                  <li>2015.09.01 ~ 2015.12.31 :: TMS Solution Launcher Development</li>
                </ul>

                <h1 id="profile">Profile</h1>
                <ul>
                  <li>Bachelor in Computer Engineering from <a href="http://www.gachon.ac.kr/">Gachon University</a>
                  </li>
                </ul>

                <h1 id="license">License</h1>
                <ul>
                  <li>Engineer Information Processing :: 2015.05.08</li>
                  <li>MOS Master :: 2013.06.10</li>
                </ul>
              </div>
            </PostFullContent>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
