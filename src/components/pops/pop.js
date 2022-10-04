import * as React from 'react'
import Slide from './Slide';
import Voice from './Voice';
import Video from './Video';
import Credits from './Credits';
import Hotspot from './Hotspot'; 

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

          <p className="pop-close">
            <a id="close-link" href="/" onClick={closePop}>
              Close
            </a>
          </p>
            
          <h4 className="subhead">{ subtitle }</h4>
          <h1>{ title }</h1>

          { (popType === 'images' ||
            popType === 'objects') &&
            <Slide
              popData = {popData}
            />
          }

          { popType === 'voices' &&
            <Voice
              popData = {popData}
            />
          }

          { popType === 'video' &&
            <Video
              popData = {popData}
            />
          }

          { popType === 'credits' &&
            <Credits
              popData = {popData}
            />
          }

          { popType === 'hotspot' &&
            <Hotspot
              popData = {popData}
            />
          }
        </div>{/* slimpop-wrapper  */} 

      </div>{/* slimpop-container  */} 

    </div> 
    

  )
}

export default Pop