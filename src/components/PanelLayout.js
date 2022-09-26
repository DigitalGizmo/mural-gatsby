import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import JSONData from '../../content/all-panels.json'

const PanelLayout = ({ pageTitle, children}) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     },
  //   }  
  // `)

  return (
    <div className="wrapper"> 


      <div className="msm-link">
        <a href="https://mainestatemuseum.org/exhibit/maine-labor-mural/">
          <img src="https://dev.digitalgizmo.com/mural-assets/images/msm-logo.svg" alt="Maine State Museum" className="msm-logo"/>
        </a>
      </div>

      <div className="site-title">
        <Link to='/'>
          <h3>Maine Labor Mural </h3>
            {/* Debug:  {data.allFile.nodes[0].name} */}
        </Link>
      </div>

      <div className="panel-nav">
        {JSONData.data.allPanels.edges.map((panel, index) => {
          if (panel.node.ordinal < 50) {
            return ( 
            // return ( chosenPanel.node.ordinal === (index + 1)
            //   ? <img key={panel.node.slug}
            //     src={`https://dev.digitalgizmo.com/mural-assets/images/mini-nav-${panel.node.ordinal}.jpg`}
            //     alt={`${panel.node.panelTitle} selected`}
            //     className="panel-nav-selected"
            //     />
            //   :
              <Link  key={panel.node.slug}
                // onClick={e => { setLinkDirection(navLinkIndexes[index]);}}
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

      <div
        className="panel-title"
      >
        <h1>{pageTitle}</h1>
      </div>
        
        {children}

    </div>
  )
}

export default PanelLayout