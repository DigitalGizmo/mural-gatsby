import * as React from 'react'
import { useContext } from 'react'
import { GlobalContext } from "../context/GlobalContext"

const Detail = ({pageContext}) => { // , setContentIndex
  const blurb = () => {
    return { __html:  pageContext.node.panelBlurb }
  }
  const introInfo =  pageContext.node.articleSet.edges[0].node;
  const foreInfo =  pageContext.node.articleSet.edges[1].node;
  const { contentIndex, setContentIndex } = useContext(GlobalContext)
  // showPop, setShowPop, 

  return (
    <div className="current-panel">
      <article>
      <h3>About This Panel</h3>
        <div dangerouslySetInnerHTML={blurb()} />
      </article>  

      <div className="panel-image">

        <svg  xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 800 1800">
          <image id="document" x="0" y="0" 
          href={`https://dev.digitalgizmo.com/mural-assets/panels/panelpics/${pageContext.node.slug}.jpg`} 
          width="800" height="1800" />

        </svg>
      </div> 

      <nav className="tabs">
      <h3>Learn More</h3>
      <ul>
        <li>
          <a 
            href="/"
            onClick={e => { e.preventDefault(); setContentIndex(0);}}
          >
            { introInfo.title } 
          </a>
        </li>
        <li>
          <a 
            href="/"
            onClick={e => { e.preventDefault(); setContentIndex(1);}}
          >
            { foreInfo.title } 
          </a>
        </li>
      </ul>
    </nav>


    </div>
  )
}

export default Detail