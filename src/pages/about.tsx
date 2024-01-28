import React from 'react';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { inner, outer, SiteMain } from '../styles/shared';
import { PostFull } from '../templates/post';
import { colors } from '../styles/colors';
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

const About: React.FC = () => (
  <IndexLayout>
    <Wrapper css={PageTemplate}>
      <HeadOfTitle
        title={'About'}
        subTitle={'Let me introduce myself'} />
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={PostFull}>
            <div className="post-content">
              <h1 id="Introduction">Introduction</h1>
              <ul>
                <li>안녕하세요:) 8년차 백엔드 개발자입니다.</li>
                <li>Clean Code와 Clean Architecture에 대한 고민을 생활화합니다.</li>
                <li>호기심이 많으며 '왜?'에 대한 탐구를 좋아합니다.</li>
              </ul>

              <h1 id="technical-skill">Skills</h1>
              <ul>
                <li>Backend
                  <ul>
                    <li>Java, Kotlin, Node.js</li>
                    <li>Spring Boot, Spring MVC, Spring Security, Spring Data JPA</li>
                    <li>Junit, Mockito, AssertJ</li>
                  </ul>
                </li>

                <li>Frontend
                  <ul>
                    <li>Typescript</li>
                    <li>React, Vue.js</li>
                    <li>Redux</li>
                  </ul>
                </li>

                <li>DevOps
                  <ul>
                    <li>Nginx, Tomcat, Resin</li>
                    <li>OracleDB, MySQL, MongoDB, Redis</li>
                    <li>Kafka</li>
                    <li>Jenkins, Bamboo, Travis CI</li>
                    <li>Git, SVN</li>
                  </ul>
                </li>
              </ul>

              <h1 id="license">License</h1>
              <ul>
                <li>Engineer Information Processing :: 2015.05.08</li>
                <li>MOS Master :: 2013.06.10</li>
              </ul>

              <h1 id="project">Project</h1>
              <ul>
                <li>2021.02.01 ~ 2021.09.30 :: GSI (Global Service Infra)</li>
                <li>2020.01.06 ~ 2020.07.31 :: ELS MSA (E-License Service)</li>
                <li>2019.10.07 ~ 2019.12.27 :: HMS (Hardware Management Service)</li>
                <li>2019.05.01 ~ 2019.07.31 :: Partner Portal v4.5</li>
                <li>2019.01.01 ~ 2019.05.31 :: V3 MSS</li>
                <li>2018.07.01 ~ 2018.10.31 :: Partner Portal v4.4</li>
                <li>2018.03.01 ~ 2019.05.31 :: Partner Portal v4.3</li>
                <li>2016.10.01 ~ 2017.06.31 :: TMS Plus v3.0 (Threat Management System)</li>
                <li>2016.04.01 ~ 2016.09.30 :: TMS Plus v2.0 QC and CCC</li>
                <li>2015.09.01 ~ 2015.12.31 :: TMS Plus Launcher</li>
              </ul>

              <h1 id="project">Toy Project</h1>
              <ul>
                <li>2021.07.05 ~ 2021.08.27 :: <a href="https://react-v-sorting.netlify.app"
                                                  target="_blank">React V Sorting</a>
                </li>
                <li>2020.12.09 ~ 2020.12.09 :: <a href="https://www.npmjs.com/package/react-adsense-google"
                                                  target="_blank">React Adsense Google</a>
                </li>
              </ul>

              <h1 id="activities">Activities</h1>
              <h2 id="2022">2022</h2>
              <ul>
                <li>2022.01.24 ~ :: Working at <strong>Naver</strong></li>
                <li>2017.11.25 ~ 2022.01.21 :: Working at <strong>AhnLab</strong></li>
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
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;

export function Head() {
  return (
    <>
      <title>About</title>
    </>
  );
}
