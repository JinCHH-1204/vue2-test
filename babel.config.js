module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //element-ui配置项
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
