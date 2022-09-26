import * as React from 'react'
import PanelLayout from '../../components/PanelLayout'
import Seo from '../../components/seo'

const Panel = () => {
  return (
    <PanelLayout pageTitle="Child Labor">

      <div 
          className="content-area"
      >

        <p>This will be a panel that contains detail, intro article and fore article</p>

        
      </div>

    </PanelLayout>
  )
}

export const Head = () => <Seo title='child labor' />

export default Panel