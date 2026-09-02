export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/destinations/index',
    'pages/publish/index',
    'pages/trips/index',
    'pages/me/index',
    'pages/place/index',
    'pages/circles/index',
    'pages/circle/index',
    'pages/review/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f8f7f2',
    navigationBarTitleText: '旅图',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f8f7f2'
  },
  tabBar: {
    color: '#74828a', selectedColor: '#12324a', backgroundColor: '#ffffff', borderStyle: 'white',
    list: [
      { pagePath: 'pages/index/index', text: '发现', iconPath: 'assets/tab-discover.png', selectedIconPath: 'assets/tab-discover.png' },
      { pagePath: 'pages/destinations/index', text: '目的地', iconPath: 'assets/tab-destination.png', selectedIconPath: 'assets/tab-destination.png' },
      { pagePath: 'pages/publish/index', text: '发布', iconPath: 'assets/tab-publish.png', selectedIconPath: 'assets/tab-publish.png' },
      { pagePath: 'pages/trips/index', text: '行程', iconPath: 'assets/tab-trip.png', selectedIconPath: 'assets/tab-trip.png' },
      { pagePath: 'pages/me/index', text: '我的', iconPath: 'assets/tab-me.png', selectedIconPath: 'assets/tab-me.png' }
    ]
  },
  permission: { 'scope.userLocation': { desc: '用于展示附近景点和计算行程距离' } },
  requiredPrivateInfos: ['chooseLocation'],
  lazyCodeLoading: 'requiredComponents'
})
