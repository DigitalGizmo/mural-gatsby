import React from 'react';

const Voice = ({popData}) => {

  return (
    <div>
      {popData.learnmoreNode.voiceSet.edges.map(voice => {
        return (
          <div key={voice.node.partNum}>
            <h3>{voice.node.title}</h3>

            <audio className="voices" controls
            
              src={`https://dev.digitalgizmo.com/mural-assets/pops/learnmore/media/p${popData.panelNum}-${popData.articleType}-${popData.learnmoreNode.learnmoreType}-${voice.node.partNum}.mp3`} 
              type="audio/mpeg"

            />
              {/* <source src={`https://dev.digitalgizmo.com/mural-assets/pops/learnmore/media/p${popData.panelNum}-${popData.articleType}-${popData.learnmoreNode.learnmoreType}-${voice.node.partNum}.mp3`} type="audio/mpeg"/> */}
              
                {/* Your browser does not support the HTML5 audio element; instead you can 
                <a href="pops/media/spago-quote.mp3">download 
                  this MP3 audio file.</a> */}
            {/* </audio> */}

            <blockquote>
              <div dangerouslySetInnerHTML={{ __html: voice.node.narrative}}/>

            </blockquote>


          </div>
        )

      })}

    </div>

  )
}

export default Voice