import * as React from 'react'
import { useState, useContext } from 'react'
import { Link } from 'gatsby' // , useStaticQuery, graphql
// import { GlobalProvider, SetDirectionGlobalContext, 
//   GetDirectionGlobalContext } from '../context/GlobalContextXX';
// import GlobalContextProvider from "../context/GlobalContext"

import { GlobalContext } from "../context/GlobalContext"
import {motion, AnimatePresence } from 'framer-motion'

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
  const { showPop, setShowPop, contentIndex, 
    setContentIndex, setLinkDirection } = useContext(GlobalContext)
  const { panelTitle, pageOrdinal } = useContext(GlobalContext)

  // const contentIndex = 2; // temp

  // setDirection(9);

  // const [linkDirection, setLinkDirection] = useState(1);
  const [navLinkIndexes, setNavLinkIndexes] = useState(
    [1,1,1,1,1,1,1,1,1,1,1]
  )

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
  // const [showPop, setShowPop] = useState(false);
  
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

        {/* <div
          className="panel-title"
        >
          <h1>{panelTitle}</h1>
        </div> */}


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


          
        {children}

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