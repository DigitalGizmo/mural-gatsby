import React, { useState, useEffect } from 'react';
import {motion, AnimatePresence } from 'framer-motion';
// import { useDrag } from '@use-gesture/react';

const Slide = ({popData}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [currSlideIndex, setCurrSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1); 
  
  const onPanStart = (event, info) => {
      event.stopPropagation()
      if (Math.abs(info.delta.x) > Math.abs(info.delta.y)) {
        info.delta.x < 0
        ? nextSlide()
        : prevSlide()
      }
  }

  const nextSlide = (event) => {
    if (slideIndex < (popData.learnmoreNode.slideSet.edges.length -1)){
      setDirection(1);
      setCurrSlideIndex(slideIndex + 1);
    }
  }
  const prevSlide = () => {
    if (slideIndex > 0) {
      setDirection(0);
      setCurrSlideIndex(slideIndex - 1);
    }
  }

  // Have to useEffect because of closure on setState
  // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
  useEffect(() => {
    // console.log('direction: ' + direction);
    setSlideIndex(currSlideIndex);
  }, [currSlideIndex, direction])

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="slide-container"
        key={slideIndex}    
        initial={{ x: direction === 1 ? '100%' : '-100%'}}
        animate={{ x: 0, opacity: 1, transition: {  duration: 1 } }}
        exit={{x: direction === 1 ? '-100%' : '100%', 
          transition: {  duration: 1 }
        }}
        // exit={{opacity: 0.2, transition: {duration: 0.5}}}
        onPanStart={onPanStart}
        // {...bindSlide()}     
      >
        <div className="pop-img">

          <motion.nav 
            className="slide-nav prev-slide"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, transition: {  duration: 0.1 } }}
            exit={{opacity: 0.1, transition: {  duration: 0.1 }
            }}            
          >
            { slideIndex > 0 
              ? <a href="/" 
                onClick={e => { e.preventDefault(); 
                  console.log('clicked prev');
                  prevSlide();}}
                >
                  <img src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/arrow-prev.png" 
                  alt="previous slide" className="slide-arrow"/>
                </a> 
              : <span className="no-more"><img src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/arrow-gray-prev.png" 
                    alt="no more slides" className="slide-arrow"/></span>
            }
          </motion.nav>

          <img 
            className="slide-image"
            alt={popData.learnmoreNode.title} 
            src={`https://dev.digitalgizmo.com/mural-assets/pops/learnmore/fullpics/p${popData.panelNum}-${popData.articleType}-${popData.learnmoreNode.learnmoreType}-${slideIndex+1}.jpg`}
          />

          <motion.nav 
            className="slide-nav next-slide"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, transition: {  duration: 0.1 } }}
            exit={{opacity: 0.1, transition: {  duration: 0.1 }
            }}
          >
            { slideIndex < (popData.learnmoreNode.slideSet.edges.length -1)
              ? <a href="/" 
                onClick={e => { e.preventDefault();
                  console.log('clicked next');
                  nextSlide();}}                
                >
                  <img src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/arrow-next.png" 
                    alt="next slide" className="slide-arrow"/>
                </a>
              : <span className="no-more"><img src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/arrow-gray-next.png" 
                    alt="no more slides" className="slide-arrow"/></span>
            }
          </motion.nav>

          {/* title is included in the caption */}
          <div dangerouslySetInnerHTML={{ __html: 
            popData.learnmoreNode.slideSet.edges[slideIndex].node.caption}}/>

        </div> {/*  end pop-img */}

        <div className='slide-caption'>

          <h4 dangerouslySetInnerHTML={{ __html: 
            popData.learnmoreNode.slideSet.edges[slideIndex].node.title}}
          />    
          <div dangerouslySetInnerHTML={{ __html: 
            popData.learnmoreNode.slideSet.edges[slideIndex].node.narrative}}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )

}

export default Slide