import {Paywall} from './paywall';
import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';
import SectionNav from './section-nav';
import cn from 'classnames';
import styled from '@emotion/styled';
import useMount from 'react-use/lib/useMount';
import {HEADER_HEIGHT} from '../utils';
import {IconGithub} from '@apollo/space-kit/icons/IconGithub';
import {PageNav, breakpoints, colors} from 'gatsby-theme-guide-core';
import {ReactComponent as SpectrumLogo} from '../assets/spectrum.svg';
import {ReactComponent as IconEmoji} from '../assets/happy.svg';
import {withPrefix} from 'gatsby';
import {FurtherAsides} from './further-asides'

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});

const InnerWrapper = styled.div({
  position: 'relative',
  flexGrow: 1,
  width: 0,
  '.api-ref': {
    h4: {
      code: {
        fontSize: '1.1em'
      }
    },
    '*:not(pre) > code[class*="language-"]': {
      padding: 0,
      background: 'none'
    }
  }
});

const BodyContent = styled.div({
  // style all anchors with an href and no prior classes
  // this helps avoid anchors with names and styled buttons
  'a[href]:not([class])': {
    color: 'var(--purple600)',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
      color: 'var(--purple300)'
    },
    code: {
      color: 'inherit'
    }
  },
  [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
    code: {
      whiteSpace: 'normal'
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      ':hover': {
        color: colors.text2
      }
    }
  },
  '*:not(style) +': {
    [['h2', 'h3', 'h4', 'h5']]: {
      marginTop: -24,
      paddingTop: HEADER_HEIGHT,
    }
  },
  img: {
    display: 'block',
    maxWidth: '100%'
  },
  '.mermaid svg': {
    maxWidth: '100%'
  },
  'ul, ol, ul ul, ol ul, ol ol, ul ol': { 
    marginLeft: 24
  },
  ul: {
    marginBottom: 24
  }
});

const Aside = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 240,
  maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  marginTop: -36,
  padding: '40px 0',
  marginLeft: 40,
  position: 'sticky',
  top: HEADER_HEIGHT,
  [breakpoints.lg]: {
    display: 'none'
  },
  [breakpoints.md]: {
    display: 'block'
  },
  [breakpoints.sm]: {
    display: 'none'
  }
});

const AsideHeading = styled.h4({
  fontWeight: 600
});

const AsideLinkWrapper = styled.h5({
  display: 'flex',
  marginBottom: 0,
  ':not(:last-child)': {
    marginBottom: 16
  }
  
});

const AsideLinkInner = styled.a(({emoji}) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: emoji ? -4 : 0,
  color: colors.text2,
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover, :active, :focus': {
    color: colors.text3
  },
  svg: {
    width: emoji ? 29.5 : 20,
    height: emoji ? 29.5 : 20,
    marginRight: emoji ? 1.5 : 6,
    marginLeft: emoji && -4.5,
    marginBottom: 3,
    stroke: 'currentColor',
    '*': {
      stroke: 'currentColor'
    }
  }
}));

function AsideLink(props) {
  return (
    <AsideLinkWrapper>
      <AsideLinkInner target="_blank" rel="noopener noreferrer" {...props} />
    </AsideLinkWrapper>
  );
}

function FeedbackLink(props) {
  function handleClick(e) {
    e.preventDefault();

    if (window.freddyWidget) {
      window.freddyWidget.show({
        custom_fields: {
          title: props.title
        }
      });
    }
  }

  return (
    <AsideLinkWrapper>
      <AsideLinkInner emoji onClick={handleClick}>
        <IconEmoji /> Send feedback
      </AsideLinkInner>
    </AsideLinkWrapper>
  );
}

FeedbackLink.propTypes = {
  title: PropTypes.string.isRequired
};

const EditLink = styled.div({
  display: 'none',
  marginTop: 48,
  justifyContent: 'flex-end',
  [breakpoints.lg]: {
    display: 'flex'
  },
  [breakpoints.md]: {
    display: 'none'
  },
  [breakpoints.sm]: {
    display: 'flex',
    marginTop: 24
  }
});

export default function PageContent(props) {
  const contentRef = useRef(null);
  const [imagesToLoad, setImagesToLoad] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useMount(() => {
    if (props.hash) {
      // turn numbers at the beginning of the hash to unicode
      // see https://stackoverflow.com/a/20306237/8190832
      const hash = props.hash.toLowerCase().replace(/^#(\d)/, '#\\3$1 ');
      try {
        const hashElement = contentRef.current.querySelector(hash);
        if (hashElement) {
          hashElement.scrollIntoView();
        }
      } catch (error) {
        // let errors pass
      }
    }

    let toLoad = 0;
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(image => {
      if (!image.complete) {
        image.addEventListener('load', handleImageLoad);
        toLoad++;
      }
    });

    setImagesToLoad(toLoad);
  });

  function handleImageLoad() {
    setImagesLoaded(prevImagesLoaded => prevImagesLoaded + 1);
  }

  const pageIndex = props.pages.findIndex(page => {
    const prefixedPath = withPrefix(page.path);
    return (
      prefixedPath === props.pathname ||
      prefixedPath.replace(/\/$/, '') === props.pathname
    );
  });

  const editLink = props.githubUrl && (
    <AsideLink href={props.githubUrl}>
      <IconGithub /> Edit on GitHub
    </AsideLink>
  );

  return (
    <Wrapper>
      <InnerWrapper>
        <Paywall pathname={props.pathname}>
          <BodyContent
            ref={contentRef}
            className={cn('content-wrapper', {
              'api-ref': props.apiReference
            })}
          >
            {props.children}
          </BodyContent>
          <Paywall pathname={props.pathname} conditionalRender>
            <EditLink>{editLink}</EditLink>
          </Paywall>
        </Paywall>
        <PageNav
          prevPage={props.pages[pageIndex - 1]}
          nextPage={props.pages[pageIndex + 1]}
        />
      </InnerWrapper>
      <Aside>
        <AsideHeading>{props.title}</AsideHeading>
        {props.headings.length > 0 && (
          <SectionNav
            headings={props.headings}
            isSubsection={props.isSubsection}
            contentRef={contentRef}
            imagesLoaded={imagesLoaded === imagesToLoad}
          />
        )}
        {props.ffWidgetId && <FeedbackLink title={props.title} />}
        <Paywall pathname={props.pathname} conditionalRender>
          {editLink}
          <FurtherAsides />
        </Paywall>
        {props.spectrumUrl && (
          <AsideLink href={props.spectrumUrl}>
            <SpectrumLogo /> Discuss on Spectrum
          </AsideLink>
        )}
      </Aside>
    </Wrapper>
  );
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  githubUrl: PropTypes.string,
  ffWidgetId: PropTypes.string,
  pages: PropTypes.array.isRequired,
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  apiReference: PropTypes.bool.isRequired,
  headings: PropTypes.array.isRequired,
  spectrumUrl: PropTypes.string
};
