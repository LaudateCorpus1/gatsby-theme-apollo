import React from 'react';
import { CloudinaryContext } from 'cloudinary-react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import PageLayout from './src/components/page-layout';
import WithGuideCSS from './src/components/with-guide-css';

export const onRenderBody = ({setPostBodyComponents, setHeadComponents}, {ffWidgetId}) => {
  if (ffWidgetId) {
    setHeadComponents([
      <script
        key="feedback"
        dangerouslySetInnerHTML={{
          __html: `
          var ffWidgetId = '${ffWidgetId}';
          var ffWidgetScript = document.createElement("script");
          ffWidgetScript.type = "text/javascript";
          ffWidgetScript.src = 'https://freddyfeedback.com/widget/freddyfeedback.js';
          document.head.appendChild(ffWidgetScript);
        `,
        }}
      />
    ]);
  }

  setPostBodyComponents([
    React.createElement('script', {
      key: 'docsearch',
      src:
        'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js'
    })
  ]);
};

const NO_LAYOUT_PATHS = [
  '/',
  '/welcome',
  '/tshirt'
]

const NO_LAYOUT_PREFIXES = [
  '/paypal',
  '/unsubscribe',
]

const noLayout = (path) =>
  !path ||
  NO_LAYOUT_PATHS.includes(path) ||
  NO_LAYOUT_PREFIXES.some((prefix) => path.startsWith(prefix))

const PINK = '#df1797'
// const PINK = '#e10098'

const theme = createMuiTheme({
  palette: { primary: { main: PINK } },
  typography: { useNextVariants: true },
})
  
export const wrapPageElement = (
  {element, props}, // eslint-disable-line react/prop-types
  pluginOptions
) => {
  const page = (
    <MuiThemeProvider theme={theme}>
      <CloudinaryContext cloudName="graphql">
        {element}
      </CloudinaryContext>
    </MuiThemeProvider>
  )
  
  console.log('PATH', props.path)
  if (noLayout(props.path)) {
    return <WithGuideCSS>{page}</WithGuideCSS>
  }

  return (
    <PageLayout {...props} pluginOptions={pluginOptions}>
      {page}
    </PageLayout>
  )
}
