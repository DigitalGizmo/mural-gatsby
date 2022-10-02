import * as React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Link, navigate } from 'gatsby' // , useStaticQuery, graphql
// import { GlobalProvider, SetDirectionGlobalContext, 
//   GetDirectionGlobalContext } from '../context/GlobalContextXX';
// import GlobalContextProvider from "../context/GlobalContext"

import { GlobalContext } from "../context/GlobalContext"
import {motion, AnimatePresence } from 'framer-motion'
// import { useDrag } from '@use-gesture/react';

import JSONData from '../../content/all-panels.json'
import Pop from './pops/pop'
import '../index.css'

// const PanelLayout = ({ pageTitle, pageOrdinal, showPop, 
//     popData, children}) => {
const PanelLayout = ({children, pageContext }) => { // , pageContext

  // temp constants
  // const showPop = false
  const popData = {notin: 'nothin'}
  // const pageOrdinal = 1
  // const pageTitle = 'temp page title'

  // const { setDirection } = useContext(SetDirectionGlobalContext);
  const {  contentIndex, showPop, setShowPop,
    setContentIndex, linkDirection, setLinkDirection } = useContext(GlobalContext)
  const { panelSlug, panelTitle, pageOrdinal } = useContext(GlobalContext)

  // const [linkDirection, setLinkDirection] = useState(1);
  const [navLinkIndexes, setNavLinkIndexes] = useState(
    [1,1,1,1,1,1,1,1,1,1,1]
  )
  // Hack to get panel index (hence num) without live data
  const slugs = ['apprenticeship', 'child-labor', 'women-textiles', 'secret-ballot', 
  'labor-day', 'logging', 'shoe-strike', 'reform', 'Rosie', 'jay-strike', 'labor-future'];

  const calcLinkIndexes = (panelIndex) => { // currPanelIndex
    // console.log('we are on panel index: ' + panelIndex);
    let newLinkIndexes = [];
    for (let i = 0; i < 11; i++){
      i < panelIndex
      ? newLinkIndexes.push(0)
      : newLinkIndexes.push(1);
    }
    setNavLinkIndexes(newLinkIndexes);
  }

  // Prevent click on (non-link) FullEntry from closing window
  const closePop = (event) => {
    console.log(event.target.className)
    event.preventDefault()
    event.stopPropagation()
    // Close if click was on lightbox (background) or close
    if (event.target.id === 'slimpop-overlay' ||
        event.target.id === 'close-link' ||
        event.target.id === 'pop-close') {
      setShowPop(false);
    }
  }

  const onChooseContent = (contentIndex) => {
    // event.preventDefault();
    setContentIndex(contentIndex);
  }
  
  // console.log('chosenPanel ordinal: ' + chosenPanel.node.ordinal)
  // console.log('children: ' + children.pageContext)

  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     },
  //   }  
  // `)

  const [numChanges, setNumChanges] = useState(0);

  function onPanStart(event, info) {
    console.log('panStart delta: ' + info.delta.x, info.delta.y +
    ' offset: ' + info.offset.x, info.offset.y)

    if (event.target.tagName === "A" || 
      event.target.parentNode.className === "pop_item") {
      // Don't slide panel when target was slide-show
      // console.log('got to ignore ');
    } else {
      if (Math.abs(info.delta.x) > Math.abs(info.delta.y)) { // pan only if move was horizontal
        if (info.delta.x < -1) {
          if (pageContext.node.ordinal < 11) { // next
            // console.log('numChanges: ' + numChanges);
            // if (numChanges < 1) {
              setLinkDirection(1);
              // console.log('dir 1, info.delta.x: ' + info.delta.x);
              // goNextPanel();
              // navigate(`/panels/jay-strike`);
              navigate(`/panels/${slugs[pageContext.node.ordinal]}`);
              // setNumChanges(numChanges + 1)
              return;

            // }
          }
        } else if (info.delta.x > 1) { // prev
          if (pageContext.node.ordinal > 1){
            // if (numChanges < 1) {

              setLinkDirection(0);
              // console.log('dir 0, info.delta.x: ' + info.delta.x)
              // goPrevPanel();
              // navigate(`/panels/apprenticeship`) 
              navigate(`/panels/${slugs[pageContext.node.ordinal - 2]}`);
              // setNumChanges(numChanges + 1);
              return;
            // }
          }
        }
      }
    }

    // }
  }


  // Workaround bcz inital={fakse} isn't working in AnimatePresence
  const variant = {
    enter: {
       x: linkDirection === 1 ? '100%' : '-100%'
    },
  };
  const noInitVariant = {
    enter: {
       x: 0
    },
  };

  // Need to set back to Detail on new page
  // And we should use this opportunity to set direction
  // in mini nav links based on current panel
  useEffect(() => {
    setContentIndex(2);
    // setCurrPanelIndex(slugs.indexOf(params.panelSlug));
    calcLinkIndexes(slugs.indexOf(panelSlug));

  }, [panelSlug])

  // function onPanEnd(event, info) {
  //   console.log('---- End delta: ' + info.delta.x, info.delta.y +
  //   ' offset: ' + info.offset.x, info.offset.y)
  // }
  

  // pageContext.node will only be defined for panels
  if (pageContext.node) {
    return (
      // <GlobalContextProvider>
      <div className="wrapper"> 
        <div className="msm-link">
          <a href="https://mainestatemuseum.org/exhibit/maine-labor-mural/">
            <img src="https://dev.digitalgizmo.com/mural-assets/images/msm-logo.svg" 
              alt="Maine State Museum" className="msm-logo"/>
          </a>
        </div>

        <div className="site-title">
          <Link to='/'>
            <h3>Maine Labor Mural</h3>
            {/* debug: ordinal {pageOrdinal} */}
            {/* slug {pageContext.node.slug} */}
            {/* debug: showPop {showPop.toString()} */}
            {/* Debug:  {data.allFile.nodes[0].name} */}
          </Link>
        </div>

        <div className="panel-nav">
          {JSONData.data.allPanels.edges.map((panel, index) => {
            if (panel.node.ordinal < 50) {
              return ( pageOrdinal === (index + 1)
                ? <img key={panel.node.slug}
                  src={`https://dev.digitalgizmo.com/mural-assets/images/mini-nav-${panel.node.ordinal}.jpg`}
                  alt={`${panel.node.panelTitle} selected`}
                  className="panel-nav-selected"
                  />
                :
                <Link  key={panel.node.slug}
                  onClick={e => { setLinkDirection(navLinkIndexes[index]);}}
                  to={`/panels/${panel.node.slug}`} >
                  <img src={`https://dev.digitalgizmo.com/mural-assets/images/mini-nav-${panel.node.ordinal}.jpg`}
                  alt={panel.node.panelTitle}/>
                </Link>
              )
            } else {
              return " ";
            }
            })
          }
        </div> {/* panel-nav */}

        <AnimatePresence initial={false}>
          <motion.div 
            className="panel-title"
            // key={pageOrdinal}
            key={ panelTitle }
            // variants={variants}
            initial={{ opacity: 0.2}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0.2}}
            transition={{duration: 0.7}}
            // {...bind()}
          >
            <h1>
              {contentIndex === 2
                ? <span>{ panelTitle }</span>
                : <a href="/"
                    onClick={e => { e.preventDefault(); onChooseContent(2);}}
                  >
                    { panelTitle }
                  </a>
              }
            </h1>
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="content-area"
          key={panelTitle}
          variants={ linkDirection < 2 ? variant : noInitVariant}
          // initial={{ x: linkDirection === 1 ? '100%' : '-100%'}}
          initial={"enter"}
          animate={{ x: 0, opacity: 1, transition: {  duration: 0.7 } }}
          // exit={{x: linkDirection === 1 ? '-100%' : '100%', 
          //   transition: {  duration: 1 }
          // }}
          exit={{opacity: 0.2, transition: {duration: 0.1}}}
          // {...bind()}
          onPanStart={onPanStart}
        >

          {children}

        </motion.div>

        { showPop &&
          <Pop
            closePop = {closePop}
            popData = {popData} 
          />
        }
      </div>
      // </GlobalContextProvider>
    )
  }
  return <div>{children}</div>
}

export default PanelLayout