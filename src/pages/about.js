// Step 1: Import React
import * as React from 'react'
import {Link} from 'gatsby'

// Step 2: Define your component
const AboutPage = () => {
  return (
    <main>
      <h1>About Me</h1>
      <Link to='/'>back home</Link>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
    </main>
  )
}

export const Head = () => (
  <>
    <title>Temp About</title>
    <meta name="description" content="Your description" />
  </>
)

// Step 3: Export your component
export default AboutPage