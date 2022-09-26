import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import JSONData from '../../content/all-panels.json'

const PanelLayout = ({ pageTitle, children}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      },
      # allFile {
      #   nodes {
      #     name
      #   }
      # }
    }  
  `)

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

        <ul>
          {JSONData.data.allPanels.edges.map((panel, index) => {
            return <li 
              key={`panel_index_${index}`}
            >
              {panel.node.slug}
            </li>
          })
          }
        </ul>

      </div>
        
        {children}


    </div>
  )
}

export default PanelLayout