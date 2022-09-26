import * as React from 'react'
import {Link} from 'gatsby'
import PanelLayout from '../../components/PanelLayout'
import Detail from '../../components/Detail'
import Seo from '../../components/seo'


const Panel = ({pageContext}) => {
  console.log( 'page context.: ' + pageContext.node.panelTitle);
  const prevPanelSlug = 'apprenticeship';
  const nextPanelSlug = 'jay-strike';

  return (
    <PanelLayout pageTitle={pageContext.node.panelTitle}>
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

        <Detail
          pageContext = {pageContext}
        />
        
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
    </PanelLayout>
  )
}

export const Head = ({pageContext}) => <Seo title={pageContext.node.panelTitle} />

export default Panel