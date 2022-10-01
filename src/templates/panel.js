import * as React from 'react'
import { useState, useContext, useEffect } from 'react'
import {Link, navigate} from 'gatsby'
// import PanelLayout from '../components/PanelLayout'
// import { SetDirectionGlobalContext, GetDirectionGlobalContext, 
//   GlobalProvider } from '../context/GlobalContextXX';
import { GlobalContext } from "../context/GlobalContext"
// import { useDrag } from '@use-gesture/react';
import {motion, AnimatePresence } from 'framer-motion'
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
  
  // const direction = useContext(GetDirectionGlobalContext);
  // const { openMenu, setOpenMenu } = useContext(GlobalContext)



  // const [contentIndex, setContentIndex] = useState(2);
  const { contentIndex, linkDirection, setLinkDirection } = useContext(GlobalContext)
  // getSlugFromIndex
  const { showPop, setShowPop } = useContext(GlobalContext)
  // , contentIndex, setContentIndex


  const { setPanelTitle, setPageOrdinal } = useContext(GlobalContext)

  // const [showPop, setShowPop] = useState(false);
  const [popData, setPopData] = useState();  

  // const linkDirection = 1

  // const openPop = (popParams) => {
  //   console.log('got to temp open pop in panel')
  //   setShowPop(true)
  // }

  // function openPop (popParams) { // panelNum, learnmoreNode
  const openPop = (popParams) => {
  // setCurrIndex(index);
    console.log('popParams.learnmoreNode.title: ' + popParams.learnmoreNode.title);
    // console.log('got to openPop');
    setPopData(popParams)
    // console.log('popData.panelNum: ' + popParams.panelNum);
    // console.log('popParams.learnmoreNode.title: ' + popParams.learnmoreNode.title);
    setShowPop(true);
  }

  // const goNextPanel = useCallback(() => 
  //   // navigate(`/panels/${getSlugFromIndex(chosenPanel.node.ordinal)}`, 
  //   navigate(`/panels/apprenctice`) 
  //   // {replace: true}), [navigate]);

  // const goPrevPanel = useCallback(() => 
  //   // navigate(`/panels/${getSlugFromIndex(chosenPanel.node.ordinal - 2)}`, 
  //   navigate(`/panels/jay-strike`, 
  //   {replace: true}), [navigate]);

  //   const navigate = useNavigate();
    const [numChanges, setNumChanges] = useState(0);

  // const bind = useDrag(({ down, target, movement: [mx,my], cancel}) => { 
  //   // console.log('panel mx, my: ' + mx +', ' + my + ' down: ' + down.toString());
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

  useEffect(() => {
    setPanelTitle(pageContext.node.panelTitle)
    setPageOrdinal(pageContext.node.ordinal)
  }, [])

  return (
    // <AnimatePresence initial={false}> 
      <>
      {/* <motion.div 
        className="content-area"
        key={pageContext.node.slug}

        initial={{ x: linkDirection === 1 ? '100%' : '-100%'}}
        
        animate={{ x: 0, opacity: 1, transition: {  duration: 0.7 } }}
        // exit={{x: linkDirection === 1 ? '-100%' : '100%', 
        //   transition: {  duration: 1 }
        // }}
        exit={{opacity: 0.2, transition: {duration: 0.5}}}
        // {...bind()}
      > */}

        <div className="prev-panel"
        // {...bind}
        >
          {prevPanelSlug &&
            <img src={`https://dev.digitalgizmo.com/mural-assets/panels/panelpics/${pageContext.node.slug}-prev.jpg`} 
            alt={`Previous panel is ${prevPanelSlug}`} />
          }
          {prevPanelSlug &&
            <Link 
              onClick={e => { setLinkDirection(0);}}
              to={`/panels/${prevPanelSlug}`} >
              <img src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/arrow-prev.png" 
                alt="prev arrow" className="arrow"/>
            </Link>
          }
        </div>

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

        <div className="next-panel">
          {nextPanelSlug &&
            <img src={`https://dev.digitalgizmo.com/mural-assets/panels/panelpics/${pageContext.node.slug}-next.jpg`} 
              alt={`${nextPanelSlug} next`} />        
          }
          {nextPanelSlug &&
            <Link 
              onClick={e => { setLinkDirection(1);}}
              to={`/panels/${nextPanelSlug}`} >
              <img src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/arrow-next.png" 
                alt="next arrow" className="arrow"/>
              {/* <p>debug: showPop {showPop ? `true` : `false`}.</p> */}

            </Link>
          }
        </div>
      </>
    // </AnimatePresence>
  )
}

export const Head = ({pageContext}) => (
  <>
    <Seo title={pageContext.node.panelTitle} />
    <meta name="description" content="Your description" />
  </>
)




export default Panel