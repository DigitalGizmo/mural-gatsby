import React from 'react';

const Video = ({popData}) => {

  return (
    <div>

      <div id="video-content">

        <video  width="720" height="405" controls="controls" 
            poster={`${process.env.GATSBY_ASSET_PATH}/pops/learnmore/media/p${popData.panelNum}-${popData.articleType}-${popData.learnmoreNode.learnmoreType}.jpg`}
        >
          <source src={`${process.env.GATSBY_ASSET_PATH}/pops/learnmore/media/p${popData.panelNum}-${popData.articleType}-${popData.learnmoreNode.learnmoreType}.mp4`} type="video/mp4"/>
          <source src={`${process.env.GATSBY_ASSET_PATH}/pops/learnmore/media/p${popData.panelNum}-${popData.articleType}-${popData.learnmoreNode.learnmoreType}.webm`} type="video/webm"/>
        
          Your browser does not support the video tag.
        </video>

        <div dangerouslySetInnerHTML={{ __html: popData.learnmoreNode.caption}}/>

      </div> 

      <div dangerouslySetInnerHTML={{ __html: popData.learnmoreNode.narrative}}/>


    </div>
  )

}

export default Video