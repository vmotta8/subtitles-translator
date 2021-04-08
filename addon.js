/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const { addonBuilder, serveHTTP, publishToCentral } = require('stremio-addon-sdk')
const { generateSubtitle } = require('./src/generateSubtitle')

const builder = new addonBuilder({
  id: 'org.subtitletranslateaddon',
  version: '1.0.3',

  logo: 'https://raw.githubusercontent.com/vmotta8/subtitles-stremio-addon/master/public/logo.png',
  name: 'English Portuguese Br Subtitles',
  description: 'Best English, Portuguese Br, Translated Subtitles and others to your movie',

  types: ['movie'],
  catalogs: [],
  resources: [
    'subtitles'
  ]
})

builder.defineSubtitlesHandler(async function (args) {
  console.log(JSON.stringify(args))
  if ((args.id).slice(0, 2) === 'tt') {
    const subtitles = await generateSubtitle(args.id)
    return Promise.resolve({ subtitles: subtitles })
  } else {
    return Promise.resolve({ subtitles: [] })
  }
})

serveHTTP(builder.getInterface(), {
  port: process.env.PORT || 7000
})

// If you want this addon to appear in the addon catalogs, call .publishToCentral() with the publically available URL to your manifest
// publishToCentral('https://my-addon.com/manifest.json')
