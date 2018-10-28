const fs = require('fs-extra')
const path = require('path')
module.exports = {
  dest: 'blog-dest',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'AmbitionElegant',
      description: '超级超级不爱学习的程序猿'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  // theme: 'vue',
  theme: '',
  themeConfig: {
    repo: 'https://github.com/zdmission/study-blog',
    // editLinks: true,
    docsDir: 'docs',
    logo: '/hero.png',
    accentColor: '#ac3e40',
		per_page: 6,
    date_format: 'yyyy-MM-dd HH:mm:ss',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        // lastUpdated: '上次更新',
        sidebarDepth: 5,
        nav: [
          {
            text: '学习',
            link: '/study/',
          },
          {
            text: '工作',
            link: '/work/'
          },
          {
            text: '日常',
            link: '/exprience/'
          },
          {
            text: '生活',
            link: '/life/'
          },
          {
            text: '关于我',
            link: '/about/'
          }
        ],
        sidebar: {
          '/study/': ['/study/'].concat(getConfigArrayData('study',['JS','CSS','Centos7.4','ES6','TypeScript','Ubuntu','Vue','Angular','Webpack','Apache-PHP-MySql','ESlint','Git','Node','Gulp','Ionic2-up','Npm'])),
          '/work/': ['/work/'].concat(getConfigArrayData('work',['JS',{cnName: '琐碎', enName: 'suosui'},'CSS','Vue','Ionic1','Linux','Mac','Mobile','WeChat','Webpack','weex','Cordova',{cnName: '服务端', enName: 'Service'}])),
          '/exprience/': genSidebarConfig('日常', getAllFileByPath('/docs/exprience')),
          '/life/': [
            '/life/',
            genSidebarConfigGroup('rap', getAllFileByPath('/docs/life/rap', '/life/rap/')),
            genSidebarConfigGroup('travelling', getAllFileByPath('/docs/life/travelling', '/life/travelling/'))
          ],
          '/about/': genSidebarConfig('关于我', getAllFileByPath('/docs/about'))
        }
      }
    }
  },
  markdown: {
    lineNumbers: true
  }
}

// 获取某个文件夹下的所有文件名 filePath值是根目录开始算，比如/docs/study
function getAllFileByPath (filePath, directories = '') {
  let result = []
  result = fs.readdirSync(path.join(process.cwd(), filePath))
  return (result || []).map(item => {
    if(item !== 'README.md') {
      return directories + item.replace(/(\.md)$/g,'')
    }else {
      return ''
    }
  })
}

function genSidebarConfigGroup (title, children) {
  return {
    title,
    collapsable: true,
    children
  }
}

function genSidebarConfig (title, children) {
  return [
    {
      title,
      collapsable: false,
      children
    }
  ]
}

/**
 *
 *
 * @param {string} catalog 类别,比如study，work，life，about等
 * @param {array} folderNameArr 文件夹名, 默认是英文名，并且统一，比如getConfigArrayData('study',['JS']),如果有中文目录名，请这样写getConfigArrayData('study',[{cnName: '服务端', enName: 'Service'}])
 */
function getConfigArrayData(catalog, folderNameArr) {
  if(folderNameArr.length == 0) return
  let resultArr = []
  folderNameArr.forEach(item => {
    let cnName, enName
    if(Object.prototype.toString.call(item) === '[object Object]') {
      if(item.hasOwnProperty('cnName')) {
        cnName = item.cnName
      }
      if(item.hasOwnProperty('enName')) {
        enName = item.enName
      }
      resultArr.push(genSidebarConfigGroup(cnName, getAllFileByPath(`/docs/${catalog}/${enName}`, `/${catalog}/${enName}/`)),)
    }else {
      resultArr.push(genSidebarConfigGroup(item, getAllFileByPath(`/docs/${catalog}/${item}`, `/${catalog}/${item}/`)),)
    }
  })
  return resultArr
}