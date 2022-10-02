import * as React from "react"
import {Link} from 'gatsby'
import { useContext, useEffect } from 'react'
import { GlobalContext } from "../context/GlobalContext"
import Seo from '../components/seo'
import '../index.css'

const IndexPage = () => {

  const { setLinkDirection } = useContext(GlobalContext); // setContentIndex,   
  // reset direction=2 on return to home to prevent initial slide transition
  useEffect(() => {
    // setContentIndex(2);
    // setCurrPanelIndex(slugs.indexOf(params.panelSlug));
    setLinkDirection(2);

  }, [])

  return (
    <main className="home"> {/* Return has to return one overarching element  */}

      <header>
        <div className="home-msm-link">
          <a href="https://mainestatemuseum.org/exhibit/maine-labor-mural">
            <img src="https://dev.digitalgizmo.com/mural-assets/images/msm-logo.svg" alt="Maine State Museum" className="msm-logo"/>
          </a>
        </div>

        <h1>Maine Labor Mural</h1>
        <p>The Maine Labor Mural depicts scenes of the state&rsquo;s labor history in an effort to honor the men and women who built Maine.</p>
        <p className="prompt">Tap/click a panel to learn more</p>
      </header>

      <section className="mural-menu">

      <Link to="/panels/apprenticeship">
        <img alt="apprenticeship"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/apprenticeship.jpg" />
        <h2>Apprenticeship</h2>
      </Link>

      <Link to="/panels/child-labor">
       <img alt="child-labor"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/child-labor.jpg" />
        <h2>Child Labor</h2>
      </Link>

      <Link to="/panels/women-textiles">
       <img alt="women-textiles"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/women-textiles.jpg" />
        <h2>Women Textile Workers</h2>
      </Link>

      <Link to="/panels/secret-ballot">
       <img alt="secret-ballot"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/secret-ballot.jpg" />
      <h2>The Secret Ballot</h2>
      </Link>
  
      <Link to="/panels/labor-day">
       <img alt="labor-day"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/labor-day.jpg" />
        <h2>First Labor Day</h2>
      </Link>

      <Link to="/panels/logging">
       <img alt="logging"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/logging.jpg" />
        <h2>Woods Workers</h2>
      </Link>

      <Link to="/panels/shoe-strike">
       <img alt="shoe-strike"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/shoe-strike.jpg" />
        <h2>The &rsquo;37 Shoe Strike</h2>
      </Link>

      <Link to="/panels/reform">
       <img alt="reform"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/reform.jpg" />
        <h2>Labor Reformers</h2>
      </Link>

      <Link to="/panels/Rosie">
       <img alt="Rosie"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/Rosie.jpg" />
        <h2>Rosie the Riveter</h2>
      </Link>

      <Link to="/panels/jay-strike">
       <img alt="jay-strike"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/jay-strike.jpg" />
        <h2>Jay Strike</h2>
      </Link>

      <Link to="/panels/labor-future">
       <img alt="labor-future"
          src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/labor-future.jpg" />
        <h2>The Future of Maine Labor</h2>
      </Link>

      </section>

      <p>The Maine Labor Mural is oil on panel and was painted by Judy Taylor, Seal Cove, Maine, 2008</p>


    </main>
  )
}

export const Head = () => <Seo title='Home' />
export default IndexPage

