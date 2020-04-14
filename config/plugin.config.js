const ThemeColorReplacer = require('webpack-theme-color-replacer')
const generate = require('@ant-design/colors/lib/generate').default
const settings = require('./configure')

function genAntSerials (color) {
  const lightens = new Array(9).fill().map((t, i) => {
    return ThemeColorReplacer.varyColor.lighten(color, i / 10)
  })
  const colorPalettes = generate(color)
  const rgb = ThemeColorReplacer.varyColor.toNum3(color.replace('#', '')).join(',')
  return lightens.concat(colorPalettes).concat(rgb)
}

const themePluginOption = {
  fileName: 'css/theme-colors-[contenthash:8].css',
  matchColors: genAntSerials(settings.colors['primary-color']),
  // 改变样式选择器，解决样式覆盖问题
  changeSelector (selector) {
    switch (selector) {
      case '.ht-calendar-today .ht-calendar-date':
        return ':not(.ht-calendar-selected-date):not(.ht-calendar-selected-day)' +
          selector
      case '.ht-btn:focus,.ht-btn:hover':
        return '.ht-btn:focus:not(.ht-btn-primary):not(.ht-btn-danger),.ht-btn:hover:not(.ht-btn-primary):not(.ht-btn-danger)'
      case '.ht-btn.active,.ht-btn:active':
        return '.ht-btn.active:not(.ht-btn-primary):not(.ht-btn-danger),.ht-btn:active:not(.ht-btn-primary):not(.ht-btn-danger)'
      case '.ht-steps-item-process .ht-steps-item-icon > .ht-steps-icon':
      case '.ht-steps-item-process .ht-steps-item-icon>.ht-steps-icon':
        return ':not(.ht-steps-item-process)' + selector
      case '.ht-menu-horizontal>.ht-menu-item-active,.ht-menu-horizontal>.ht-menu-item-open,.ht-menu-horizontal>.ht-menu-item-selected,.ht-menu-horizontal>.ht-menu-item:hover,.ht-menu-horizontal>.ht-menu-submenu-active,.ht-menu-horizontal>.ht-menu-submenu-open,.ht-menu-horizontal>.ht-menu-submenu-selected,.ht-menu-horizontal>.ht-menu-submenu:hover':
      case '.ht-menu-horizontal > .ht-menu-item-active,.ht-menu-horizontal > .ht-menu-item-open,.ht-menu-horizontal > .ht-menu-item-selected,.ht-menu-horizontal > .ht-menu-item:hover,.ht-menu-horizontal > .ht-menu-submenu-active,.ht-menu-horizontal > .ht-menu-submenu-open,.ht-menu-horizontal > .ht-menu-submenu-selected,.ht-menu-horizontal > .ht-menu-submenu:hover':
        return '.ht-menu-horizontal > .ht-menu-item-active,.ht-menu-horizontal > .ht-menu-item-open,.ht-menu-horizontal > .ht-menu-item-selected,.ht-menu-horizontal:not(.ht-menu-dark) > .ht-menu-item:hover,.ht-menu-horizontal > .ht-menu-submenu-active,.ht-menu-horizontal > .ht-menu-submenu-open,.ht-menu-horizontal:not(.ht-menu-dark) > .ht-menu-submenu-selected,.ht-menu-horizontal:not(.ht-menu-dark) > .ht-menu-submenu:hover'
      case '.ht-menu-horizontal > .ht-menu-item-selected > a':
      case '.ht-menu-horizontal>.ht-menu-item-selected>a':
        return '.ht-menu-horizontal:not(ant-menu-light):not(.ht-menu-dark) > .ht-menu-item-selected > a'
      case '.ht-menu-horizontal > .ht-menu-item > a:hover':
      case '.ht-menu-horizontal>.ht-menu-item>a:hover':
        return '.ht-menu-horizontal:not(ant-menu-light):not(.ht-menu-dark) > .ht-menu-item > a:hover'
      default :
        return selector
    }
  }
}
const createThemeColorReplacerPlugin = () => new ThemeColorReplacer(themePluginOption)

module.exports = createThemeColorReplacerPlugin
