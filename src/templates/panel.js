import * as React from 'react'
import { useContext, useEffect } from 'react' // useState, 
import {Link} from 'gatsby' // , navigate
import { GlobalContext } from "../context/GlobalContext"
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
  
  const { contentIndex, setLinkDirection, setShowPop, setPanelSlug, 
    setPanelTitle, setPageOrdinal, setPopData } = useContext(GlobalContext)

  // function openPop (popParams) { // panelNum, learnmoreNode
  const openPop = (popParams) => {
    setPopData(popParams)
    setShowPop(true);
  }

  useEffect(() => {
    setPanelSlug(pageContext.node.slug)
    setPanelTitle(pageContext.node.panelTitle)
    setPageOrdinal(pageContext.node.ordinal)
  }, [])

  return (
    <>
      <div className="prev-panel">
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
  )
}

export const Head = ({pageContext}) => (
  <>
    <Seo title={pageContext.node.panelTitle} />
    <link rel="stylesheet" href="https://use.typekit.net/jmk5ehg.css"/>
  </>
)

export default Panel