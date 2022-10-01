import * as React from 'react'
import { useState, useContext } from 'react'
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
  const { showPop, setShowPop, contentIndex, 
    setContentIndex, linkDirection, setLinkDirection } = useContext(GlobalContext)
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

  const [numChanges, setNumChanges] = useState(0);

  // const bind = useDrag(({ down, target, movement: [mx,my], cancel}) => { 
  //   console.log('panel mx, my: ' + mx +', ' + my + ' down: ' + down.toString());
  //   if (down) {
  //     // ignore
  //     setNumChanges(0);
  //   } else {

  //     if (target.tagName === "A" || 
  //       target.parentNode.className === "pop_item") {
  //       // Don't slide panel when target was slide-show
  //       // console.log('got to ignore ');
  //     } else {
  //       if (Math.abs(mx) > Math.abs(my)) { // pan only if move was horizontal
  //         if (mx < -1) {
  //           if (pageContext.node.ordinal < 11) {
  //             // console.log('numChanges: ' + numChanges);
  //             if (numChanges < 1) {
  //               setLinkDirection(1);
  //               // console.log('dir 1, mx: ' + mx);
  //               // goNextPanel();
  //               navigate(`/panels/jay-strike`) 
  //               setNumChanges(numChanges + 1);
  //               cancel();
  //               return;

  //             }
  //           }
  //         } else if (mx > 1) {
  //           if (pageContext.node.ordinal > 1){
  //             if (numChanges < 1) {

  //               setLinkDirection(0);
  //               // console.log('dir 0, mx: ' + mx)
  //               // goPrevPanel();
  //               navigate(`/panels/apprenctice`) 
  //               setNumChanges(numChanges + 1);
  //               cancel();
  //               return;
  //             }
  //           }
  //         }
  //       }
  //     }
  
  //   }
  // })


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