import React from 'react'

import '../guide.css'
import CustomSEO from './custom-seo';

export default ({children}) => (
  <>
    <CustomSEO
        title="The GraphQL Guide"
        siteName="The GraphQL Guide"
        favicon="/favicon.ico"
        twitterHandle="graphqlguide"
        description="The complete guide to GraphQL, from a beginner introduction to advanced client and server topics. A comprehensive 886-page book from John Resig, the creator of jQuery."
        image="https://res.cloudinary.com/graphql/header"
      />
    {children}
  </>
)