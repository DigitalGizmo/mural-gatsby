import * as React from 'react'
import { useContext, useEffect } from 'react' // useState, 
import { Link, navigate } from 'gatsby' // , navigate
import { GlobalContext } from "../context/GlobalContext"
import {motion, AnimatePresence } from 'framer-motion' // , AnimatePresence
import Detail from '../components/Detail'
import Article from '../components/Article'
import Seo from '../components/seo'
import JSONData from '../../content/all-panels.json'
import '../index.css'

const Panel = ({pageContext}) => {
  // console.log( 'page context.: ' + pageContext.node.panelTitle);
  const nextPanelSlug = pageContext.node.ordinal < 11
  ? JSONData.data.allPanels.edges[pageContext.node.ordinal].node.slug
  : null;
  const prevPanelSlug = pageContext.node.ordinal > 1 
  ? JSONData.data.allPanels.edges[pageContext.node.ordinal - 2].node.slug
  : null;
  
  const { contentIndex, linkDirection, setLinkDirection, setShowPop, setPanelSlug, 
    setPanelTitle, setPageOrdinal, setPopData } = useContext(GlobalContext)

  // Hack to get panel index (hence num) without live data
  const slugs = ['apprenticeship', 'child-labor', 'women-textiles', 'secret-ballot', 
  'labor-day', 'logging', 'shoe-strike', 'reform', 'Rosie', 'jay-strike', 'labor-future'];

  // function openPop (popParams) { // panelNum, learnmoreNode
  const openPop = (popParams) => {
    setPopData(popParams)
    setShowPop(true);
  }

  function onPanStart(event, info) {
    // console.log('panStart delta: ' + info.delta.x, info.delta.y +
    // ' offset: ' + info.offset.x, info.offset.y)

    if (event.target.tagName === "A" || 
      event.target.parentNode.className === "pop_item") {
      // Don't slide panel when target was slide-show
      // console.log('got to ignore ');
    } else {
      if (Math.abs(info.delta.x) > Math.abs(info.delta.y)) { // pan only if move was horizontal
        if (info.delta.x < -1) {
          if (pageContext.node.ordinal < 11) { // next
            // console.log('numChanges: ' + numChanges);
            setLinkDirection(1);
            // console.log('dir 1, info.delta.x: ' + info.delta.x);
            navigate(`/panels/${slugs[pageContext.node.ordinal]}`);
            return;
          }
        } else if (info.delta.x > 1) { // prev
          if (pageContext.node.ordinal > 1){
            setLinkDirection(0);
            // console.log('dir 0, info.delta.x: ' + info.delta.x)
            navigate(`/panels/${slugs[pageContext.node.ordinal - 2]}`);
            return;
          }
        }
      }
    }
  }  
  // Workaround bcz inital={false} isn't working in AnimatePresence
  const variant = {
    enter: { x: linkDirection === 1 ? '100%' : '-100%' },
  };

  const noInitVariant = {
    enter: { x: 0 },
  };

  useEffect(() => {
    setPanelSlug(pageContext.node.slug)
    setPanelTitle(pageContext.node.panelTitle)
    setPageOrdinal(pageContext.node.ordinal)
  }, [pageContext.node.slug, pageContext.node.panelTitle,
    pageContext.node.ordinal,
  ])

  return (
    <motion.div 
      className="content-area"
      key={pageContext.node.slug}
      variants={ linkDirection < 2 ? variant : noInitVariant}
      // initial={{ x: linkDirection === 1 ? '100%' : '-100%'}}
      initial={"enter"}
      animate={{ x: 0, opacity: 1, transition: {  duration: 1.4 } }}
      exit={{
        x: linkDirection === 1 ? '-100%' : '100%', 
        opacity: 0.2,
        transition: {  duration: 1.4 }
      }}
      // exit={{opacity: 0.2, transition: {duration: 2.1}}}
      // {...bind()}
      onPanStart={onPanStart}
    >      
      <div className="prev-panel">
        {prevPanelSlug &&
          <img src={`${process.env.GATSBY_ASSET_PATH}/panels/panelpics/${pageContext.node.slug}-prev.jpg`} 
          alt={`Previous panel is ${prevPanelSlug}`} />
        }
        {prevPanelSlug &&
          <Link 
            onClick={e => { setLinkDirection(0);}}
            to={`/panels/${prevPanelSlug}`} >
            <motion.img 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1, transition: {  duration: 0.1 } }}
              exit={{opacity: 0.1, transition: {  duration: 0.1 }
              }}            
              src={`${process.env.GATSBY_ASSET_PATH}/panels/panelpics/arrow-prev.png`} 
              alt="prev arrow" className="arrow"
            />
          </Link>
        }
      </div>

      <AnimatePresence>

      { contentIndex === 2 &&
        <Detail
          pageContext = {pageContext}
          // setContentIndex = {setContentIndex}
          openPop = {openPop}
          // closePop via panelLayout
        />
      }
      { (contentIndex === 0 || contentIndex === 1) &&
        <Article
          pageContext = {pageContext}
          // setContentIndex = {setContentIndex}
          contentIndex = { contentIndex }
          openPop = {openPop}
          // closePop via panelLayout
        />
      }
      </AnimatePresence>
      <div className="next-panel">
        {nextPanelSlug &&
          <img src={`${process.env.GATSBY_ASSET_PATH}/panels/panelpics/${pageContext.node.slug}-next.jpg`} 
            alt={`${nextPanelSlug} next`} />        
        }
        {nextPanelSlug &&
          <Link 
            onClick={e => { setLinkDirection(1);}}
            to={`/panels/${nextPanelSlug}`} >
            <motion.img 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1, transition: {  duration: 0.1 } }}
              exit={{opacity: 0.1, transition: {  duration: 0.1 }
              }}            
              src={`${process.env.GATSBY_ASSET_PATH}/panels/panelpics/arrow-next.png`} 
              alt="next arrow" className="arrow"
            />
            {/* <p>debug: showPop {showPop ? `true` : `false`}.</p> */}

          </Link>
        }
      </div>
    </motion.div>
  )
}

export const Head = ({pageContext}) => (
  <>
    <Seo title={pageContext.node.panelTitle} />
    <link rel="stylesheet" href="https://use.typekit.net/jmk5ehg.css"/>
  </>
)

export default Panel