const path = require(`path`)
const JSONData = require('./content/all-panels.json')

// Log info after build is done
exports.onPostBuild = ({reporter}) => {
  reporter.info(`Site built with dynamic pages`)
}

// Create panel pages dynamically
exports.createPages = ({ actions}) => {
  const { createPage } = actions
  const panelTemplate = path.resolve(`src/templates/panel.js`)

  JSONData.data.allPanels.edges.forEach(panel_object => {

    if (panel_object.node.ordinal < 12) {

      console.log('in creat page: ' + panel_object.node.slug)
  
      // let path = panel_object.node.slug;
      createPage({
        path: `panels/${panel_object.node.slug}`,
        component: panelTemplate,
        context: panel_object,
      })
    }

  })
}