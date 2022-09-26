import * as React from "react"
import {Link} from 'gatsby'
import Seo from '../components/seo'
import '../index.css'

const IndexPage = () => {
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

        <Link to="/panels/child-labor">
        <img alt="child-labor"
            src="https://dev.digitalgizmo.com/mural-assets/panels/panelpics/child-labor.jpg" />
          <h2>Child Labor</h2>
        </Link>

      </section>

      <p>The Maine Labor Mural is oil on panel and was painted by Judy Taylor, Seal Cove, Maine, 2008</p>


    </main>
  )
}

export const Head = () => <Seo title='Home' />
export default IndexPage

