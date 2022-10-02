import React from 'react';

const Credits = ({popData}) => {

  return (
    <div dangerouslySetInnerHTML={{ __html: popData.learnmoreNode.narrative}}/>
  )
}

export default Credits