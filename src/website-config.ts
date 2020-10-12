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
  facebook: 'https://www.facebook.com/lucky.dave.k',
  instagram: 'https://www.instagram.com/lucky.dave',
  twitter: '',
  showSubscribe: true,
  mailchimpAction: '',
  mailchimpName: '',
  mailchimpEmailFieldName: '',
  googleSiteVerification: 'GoogleCode',
  footer: 'blog is proudly published with Gatsby & GitHub Pages',
};

export default config;
