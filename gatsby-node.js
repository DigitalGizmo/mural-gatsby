const path = require(`path`)
const JSONData = require('./content/all-panels.json')

// Log info after build is done
exports.onPostBuild = ({reporter}) => {
  reporter.info(`Site built with dynamic pages`)
}

// Create panel pages dynamically
exports.createPages = ({ actions}) => {
  const { createPage } = actions
  const panelTemplate = path.resolve(`src/panels/panel.js`)

  JSONData.data.allPanels.edges.forEach(panel_object => {

    console.log('in creat page: ' + panel_object.node.slug)

    // let path = panel_object.node.slug;
    // createPage({
    //   path,
    //   component: panelTemplate,
    //   context: panel_object,
    // })

  })
}