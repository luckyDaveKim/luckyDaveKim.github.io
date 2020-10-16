/* eslint-disable @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-var-requires */
const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.
  // eslint-disable-next-line default-case
  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { permalink, template, primaryTag } = node.frontmatter;
      const { relativePath } = getNode(node.parent);
      const category = relativePath.split('/')[0];

      let slug = permalink;

      if (!slug) {
        /*
          An 'index.md' file of permalink is parent directory name. Otherwise
          '*.md' file of permalink is that name.
         */
        slug = `/${relativePath.replace('/index.md', '').replace('.md', '')}`;
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || '',
      });

      // Used to determine a page template.
      createNodeField({
        node,
        name: 'template',
        value: template || '',
      });

      createNodeField({
        node,
        name: 'primaryTag',
        value: primaryTag || '',
      });

      createNodeField({
        node,
        name: 'category',
        value: category || '',
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            excerpt
            timeToRead
            frontmatter {
              template
              title
              tags
              date
              draft
              excerpt
              image {
                childImageSharp {
                  fluid(maxWidth: 3720) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
            }
            fields {
              category
              slug
            }
          }
        }
      }
      categories: allMarkdownRemark(filter: {}) {
        group(field: fields___category) {
          totalCount
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  // Create post pages
  const posts = result.data.allMarkdownRemark.edges;

  // Create paginated index
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/${i + 1}`,
      component: path.resolve('./src/templates/index.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        numPages,
        pathPrefix: '/'
      },
    });
  });

  posts.forEach(({ node }, index) => {
    const { slug } = node.fields;
    const { template, tags } = node.frontmatter;
    const prev = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `template` frontmatter in the Markdown.
      //
      // Feel free to set any `template` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${template || 'post'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        prev,
        next,
        primaryTag: tags ? tags[0] : '',
      },
    });
  });

  // Create tag pages
  const tagTemplate = path.resolve('./src/templates/tag.tsx');
  const tags = _.uniq(
    _.flatten(
      posts.map(edge => {
        return _.castArray(_.get(edge, 'node.frontmatter.tags', []));
      }),
    ),
  );
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });

  // Create category pages
  const categoryTemplate = path.resolve('./src/templates/category.tsx');
  result.data.categories.group
    .forEach(({
                fieldValue: category,
                totalCount: numPosts
              }) => {
      const postsPerPage = 6;
      const numPages = Math.ceil(numPosts / postsPerPage);
      const pathPrefix = `/${_.kebabCase(category)}`;

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `${pathPrefix}` : `${pathPrefix}/${i + 1}`,
          component: categoryTemplate,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages,
            pathPrefix,
            category,
          },
        });
      });
    });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === 'develop' || stage === 'develop-html') {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};
