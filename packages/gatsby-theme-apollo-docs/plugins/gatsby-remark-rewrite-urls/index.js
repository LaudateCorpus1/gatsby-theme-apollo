// restart `gatsby develop` after editing

// https://www.gatsbyjs.com/tutorial/remark-plugin-tutorial/
// https://astexplorer.net/#/gist/d9029a2e8827265fbb9b190083b59d4d/3384f3ce6a3084e50043d0c8ce34628ed7477603

// https://github.com/syntax-tree/unist-util-visit
const visit = require('unist-util-visit')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', (node) => {
    node.url = node.url.replace(/\.md/, '').replace('../', '../../');
  })
  
  // doesn't work—url change happens after img processing
  // visit(markdownAST, 'image', (node) => {
  //   node.url = node.url.replace(/img\//, '../img/');
  // })
  
  return markdownAST;
};