import React, { useState, useEffect } from 'react';
// , useRef
import {motion, AnimatePresence } from 'framer-motion';

const Slide = ({popData}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [currSlideIndex, setCurrSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1); 
  // const [ref] = useState(null)
  
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

  // const handleKeyDown = event => {
  //   console.log('User pressed: ', event.key);
  //   if (event.key === 'ArrowRight') nextSlide();
  //   if (event.key === 'ArrowLeft') prevSlide();
  // };

  // Focus this div so it will listen to key press
  // const ref = useRef(null);

  // useEffect(() => {
  //   ref.current.focus();
  // ref = useRef(null);
  // ref.current.focus();
  // }, []);  

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
        // ref={ref} tabIndex={-1}   
        // onKeyDown={handleKeyDown}
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
              ? <button onClick={ prevSlide }>
                  <img src={`${process.env.GATSBY_ASSET_PATH}/panels/panelpics/arrow-prev.png`}
                  alt="previous slide" className="slide-arrow"/>
                </button> 
              : <span className="no-more"><img src={`${process.env.GATSBY_ASSET_PATH}/panels/panelpics/arrow-gray-prev.png`} 
                    alt="no more slides" className="slide-arrow"/></span>
            }
          </motion.nav>

          <img 
            className="slide-image"
            alt={popData.learnmoreNode.title} 
            src={`${process.env.GATSBY_ASSET_PATH}/pops/learnmore/fullpics/p${popData.panelNum}-${popData.articleType}-${popData.learnmoreNode.learnmoreType}-${slideIndex+1}.jpg`}
          />

          <motion.nav 
            className="slide-nav next-slide"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, transition: {  duration: 0.1 } }}
            exit={{opacity: 0.1, transition: {  duration: 0.1 }
            }}
          >
            { slideIndex < (popData.learnmoreNode.slideSet.edges.length -1)
              ? <button onClick={ nextSlide }>
                  <img src={`${process.env.GATSBY_ASSET_PATH}/panels/panelpics/arrow-next.png`}
                    alt="next slide" className="slide-arrow"/>
                </button>
              : <span className="no-more"><img src={`${process.env.GATSBY_ASSET_PATH}/panels/panelpics/arrow-gray-next.png`} 
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