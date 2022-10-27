import * as React from 'react'
import { useContext } from 'react'
import {motion } from 'framer-motion'
import { GlobalContext } from "../context/GlobalContext"

const Article = ({pageContext, openPop}) => {
  const { contentIndex, setContentIndex } = useContext(GlobalContext)
  const articleInfo =  pageContext.node.articleSet.edges[contentIndex].node;
  const introTitle =  pageContext.node.articleSet.edges[0].node.title;
  const foreTitle =  pageContext.node.articleSet.edges[1].node.title;
  const panelNum = pageContext.node.ordinal;

  const narrative = () => {
    return { __html:  articleInfo.narrative }
  }
  const caption = () => {
    return { __html:  articleInfo.caption }
  }

  return (
    <motion.div 
      className="current-panel-article"
      key={ contentIndex }
      initial={{ opacity: 0.2}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0.2}}
      transition={{duration: 0.5}}
    >
      <nav className="tabs">
        <ul>
          { contentIndex === 0
            ? <li className="selected-article"><span>{ introTitle }</span> </li>
            : <li>
              <a  href="/intro"
                onClick={e => { e.preventDefault(); setContentIndex(0);}}>
                { introTitle } 
              </a>
            </li>
          }
          { contentIndex === 1
            ? <li className="selected-article"><span>{ foreTitle }</span></li>
            : <li>
              <a  href="/foreground"
                onClick={e => { e.preventDefault(); setContentIndex(1);}}>
                { foreTitle } 
              </a>
            </li>
          }

        </ul>
      </nav>

      <article className="article-body">
        <h2>{ articleInfo.title }</h2>
        <div dangerouslySetInnerHTML={narrative()} />
      </article>

      <div className="panel-image">

      <img alt={`panel: ${ articleInfo.title } `}
          src={`${process.env.GATSBY_ASSET_PATH}/panels/articlepics/p${panelNum}-${articleInfo.articleType}.jpg`}/>
        <div 
          dangerouslySetInnerHTML={caption()} 
          className="prompt"/>
          {/* Moved class from <p> to this manditory extra div */}

      </div>{/* /panel-image */}          

      <nav className="learn-more">
        { articleInfo.learnmoreSet.edges.length > 0 &&
          <h3>Learn More</h3>
        }
        <ul>
          {articleInfo.learnmoreSet.edges.map(learnmore => {
            return (
              <li key={learnmore.node.title}>
                <a className="pop_item" 
                  href='/' onClick={e => { e.preventDefault(); 
                    openPop({popType: learnmore.node.learnmoreType, 
                      panelNum: panelNum, articleType: articleInfo.articleType,
                      learnmoreNode: learnmore.node});}}>
                  <img alt={`learn more: ${ learnmore.node.title } `}
                    src={`${process.env.GATSBY_ASSET_PATH}/pops/learnmore/thumbpics/p${panelNum}-${articleInfo.articleType}-${learnmore.node.learnmoreType}.jpg`}/>
                  <span>{
                    learnmore.node.learnmoreType.charAt(0).toUpperCase() +
                    learnmore.node.learnmoreType.slice(1)
                    }: </span>
                  {learnmore.node.title}
                </a> 
              </li>
            )
          })}
                              
        </ul>
      </nav>

    </motion.div> //current-panel-article
  )
}

export default Article