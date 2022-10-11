import * as React from 'react'
import {motion } from 'framer-motion' 
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
  
  if (popData) {
    return (
      <motion.div 
        id="slimpop-overlay" 
        onClick={closePop}
        key={popData}
        initial={{ opacity: .2, }}
        animate={{ opacity: 1,
          transition: {  duration: 0.2 } }}
        exit={{opacity: 0,
          transition: {  duration: 0.2 }       
        }}     
    > 
        <motion.div 
          id="slimpop-container"
          // key={popData}
          initial={{ opacity: .2, scale: .5 }}
          animate={{ opacity: 1, scale: 1,
            transition: {  duration: 0.3 } }}
          exit={{opacity: 0, scale: .01,
            transition: {  duration: 0.2 }       
          }}     
        >
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

        </motion.div>{/* slimpop-container  */} 

      </motion.div> 
    )
  }
  return <div><p>Loading...</p></div>
}

export default Pop