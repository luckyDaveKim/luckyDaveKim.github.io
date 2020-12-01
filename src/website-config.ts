export interface WebsiteConfig {
  title: string;
  description: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  github?: string;
  /**
   * full url, no username
   */
  linkedin?: string;
  /**
   * full url, no username
   */
  facebook?: string;
  /**
   * full url, no username
   */
  instagram?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * GitHub owner/repo
   */
  utterancesRepo?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
   * Meta tag for Naver Webmaster Tools
   */
  naverSiteVerification?: string;
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
}

const config: WebsiteConfig = {
  title: 'DevDave',
  description: '프로그래밍으로 예술을 꿈꾸다',
  lang: 'ko',
  siteUrl: 'https://luckydavekim.github.io',
  github: 'https://github.com/luckyDaveKim',
  linkedin: 'https://www.linkedin.com/in/%EB%AF%BC%EA%B7%9C-%EA%B9%80-88890818b',
  facebook: 'https://www.facebook.com/lucky.dave.k',
  instagram: 'https://www.instagram.com/lucky.dave',
  twitter: '',
  utterancesRepo: 'luckyDaveKim/luckyDaveKim.github.io',
  showSubscribe: false,
  mailchimpAction: '',
  mailchimpName: '',
  mailchimpEmailFieldName: '',
  googleSiteVerification: 'Ze766h-NxidIPwgp4pq6c2EgVNG-Lkorf72kY3Zne-U',
  naverSiteVerification: 'e3439586b4f8ec683a32b7204c6afae7355c4c65',
  footer: 'blog is proudly published with Gatsby & GitHub Pages',
};

export default config;
