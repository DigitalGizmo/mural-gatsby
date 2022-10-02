import React from 'react';

const Hotspot = ({ popData }) => {

  return (
    <div>
     <div className="pop-img">
        <img alt={`learn more: ${ popData.hotspotNode.title } `}
          src={`https://dev.digitalgizmo.com/mural-assets/pops/hotspot/p${popData.panelNum}-${popData.hotspotNode.slug}.jpg`}/>
      	
        <div dangerouslySetInnerHTML={{ __html: popData.hotspotNode.caption}}/>

      </div>

      <h4 dangerouslySetInnerHTML={{ __html: popData.hotspotNode.title}}
      />    
      <div dangerouslySetInnerHTML={{ __html: popData.hotspotNode.narrative}}/>


    </div>
  )
}

export default Hotspot