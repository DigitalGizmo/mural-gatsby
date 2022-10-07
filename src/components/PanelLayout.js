import * as React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Link } from 'gatsby' // , useStaticQuery, graphql , navigate
import { GlobalContext } from "../context/GlobalContext"
import {motion, AnimatePresence } from 'framer-motion'
import JSONData from '../../content/all-panels.json'
import Pop from './pops/pop'
import '../index.css'

// const PanelLayout = ({ pageTitle, pageOrdinal, showPop, 
//     popData, children}) => {
const PanelLayout = ({children, pageContext }) => { // , pageContext
  const {  contentIndex, showPop, setShowPop, popData,
    setContentIndex, setLinkDirection } = useContext(GlobalContext)
  const { panelSlug, panelTitle, pageOrdinal } = useContext(GlobalContext)
  // , linkDirection

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
    console.log('in closePop: ' + event.target.className)
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
  
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     },
  //   }  
  // `)


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

        <AnimatePresence>

        {/* <motion.div 
          className="content-area"
          key={panelSlug}
          variants={ linkDirection < 2 ? variant : noInitVariant}
          // initial={{ x: linkDirection === 1 ? '100%' : '-100%'}}
          initial={"enter"}
          animate={{ x: 0, opacity: 1, transition: {  duration: 2.7 } }}
          // exit={{x: linkDirection === 1 ? '-100%' : '100%', 
          //   transition: {  duration: 1 }
          // }}
          exit={{opacity: 0.2, transition: {duration: 2.1}}}
          // {...bind()}
          onPanStart={onPanStart}
        > */}

          {children}

        {/* </motion.div> */}
        </AnimatePresence>
        { showPop &&
          <Pop
            closePop = {closePop}
            popData = {popData} 
          />
        }
      </div>
    )
  }
  return <div>{children}</div>
}

export default PanelLayout