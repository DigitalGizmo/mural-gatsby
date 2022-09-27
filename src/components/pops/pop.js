import * as React from 'react'

const Pop = ({popData, closePop}) => {
  let title = "to be set";
  let subtitle = "also to be set";
  let popType = "tbd";

  if (popData.popType === 'hotspot') {
    // console.log('hotspot');
    subtitle = 'Hotspot';
    title = popData.hotspotNode.title;
    popType = 'hotspot';
  } else { // learnmore
    subtitle = popData.learnmoreNode.learnmoreType;
    title = popData.learnmoreNode.title;
    popType = popData.learnmoreNode.learnmoreType;
  }
  
  return (
    <div id="slimpop-overlay" onClick={closePop}> {/* className="lightbox"  onClick={closeFullEntry} */}
      <div id="slimpop-container">

        <div className="slimpop-wrapper">

          <button className="pop-close" 
            onClick={closePop}
            id="close-link"
            >
            {/* <a id="close-link" 
              href="/panels/apprenticeship" 
              // onClick={closePop}
              // onClick={e => { e.preventDefault(); closePop;}}
            > */}
              Close
            {/* </a> */}
          </button>
            
          <h4 className="subhead">{ subtitle }</h4>
          <h1>{ title }</h1>

        </div>{/* slimpop-wrapper  */} 

      </div>{/* slimpop-container  */} 

    </div> 
    

  )
}

export default Pop