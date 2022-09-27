import * as React from 'react'

const Detail = ({pageContext}) => {
  const blurb = () => {
    return { __html:  pageContext.node.panelBlurb }
  }
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
    </div>
  )
}

export default Detail