import * as React from 'react'
import { useState } from 'react'
import {Link} from 'gatsby'
import PanelLayout from '../components/PanelLayout'
import Detail from '../components/Detail'
import Article from '../components/Article'
import Seo from '../components/seo'
import JSONData from '../../content/all-panels.json'
import '../index.css'


const Panel = ({pageContext}) => {
  // console.log( 'page context.: ' + pageContext.node.panelTitle);
  const [contentIndex, setContentIndex] = useState(2);
  const nextPanelSlug = pageContext.node.ordinal < 11
    ? JSONData.data.allPanels.edges[pageContext.node.ordinal].node.slug
    : null;

  const prevPanelSlug = pageContext.node.ordinal > 1 
    ? JSONData.data.allPanels.edges[pageContext.node.ordinal - 2].node.slug
    : null;

  const [showPop, setShowPop] = useState(false);
  const [popData, setPopData] = useState();  

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

  // // Prevent click on (non-link) FullEntry from closing window
  // const closePop = (event) => {
  //   console.log(event.target.className)
  //   event.preventDefault()
  //   event.stopPropagation()
  //   // Close if click was on lightbox (background) or close
  //   if (event.target.id === 'slimpop-overlay' ||
  //       event.target.id === 'close-link' ||
  //       event.target.id === 'pop-close') {
  //     setShowPop(false);
  //   }
  // }

  return (
    // <PanelLayout 
    //   pageTitle={pageContext.node.panelTitle}
    //   // chosenPanel={pageContext} // whole, but Only need ordinal, slug, panelTitle
    //   pageOrdinal={pageContext.node.ordinal}
    //   showPop={showPop}
    //   popData={popData}
    // >
      <div 
          className="content-area"
      >

        <div className="prev-panel">
          {prevPanelSlug &&
            <img src={`https://dev.digitalgizmo.com/mural-assets/panels/panelpics/${pageContext.node.slug}-prev.jpg`} 
            alt={`Previous panel is ${prevPanelSlug}`} />
          }
          {prevPanelSlug &&
            <Link 
              // onClick={e => { setLinkDirection(0);}}
              to={`/panels/${prevPanelSlug}`} >
              <img src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/arrow-prev.png" 
                alt="prev arrow" className="arrow"/>
            </Link>
          }
        </div>

        { contentIndex === 2 &&
          <Detail
            pageContext = {pageContext}
            setContentIndex = {setContentIndex}
            openPop = {openPop}
            // closePop via panelLayout
          />
        }
        { (contentIndex === 0 || contentIndex === 1) &&
          <Article
            pageContext = {pageContext}
            setContentIndex = {setContentIndex}
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
              // onClick={e => { setLinkDirection(1);}}
              to={`/panels/${nextPanelSlug}`} >
              <img src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/arrow-next.png" 
                alt="next arrow" className="arrow"/>
                {/* debug,
                chosenPanel - 1: {chosenPanel.node.ordinal - 1} */}
            </Link>
          }
        </div>
      </div>
    // </PanelLayout>
  )
}

export const Head = ({pageContext}) => (
  <>
    <Seo title={pageContext.node.panelTitle} />
    <meta name="description" content="Your description" />
  </>
)




export default Panel