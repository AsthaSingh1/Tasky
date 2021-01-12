module.exports = {
  pwa: {
    name: 'Tasky',
    themeColor: '#50E3C2',
    msTileColor: '#50E3C2',
    manifestOptions: {
      background_color: '#212121',
      icons: [
        { src: './img/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: './img/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ]
    },
    workboxOptions: {
      exclude: [/_redirects/]
    }
  },

  productionSourceMap: false
}