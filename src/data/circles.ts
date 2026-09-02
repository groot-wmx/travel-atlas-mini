export type Circle={id:string;name:string;city:string;members:number;summary:string;emoji:string;tags:string[]}
export const circles:Circle[]=[
  {id:'hangzhou-weekend',name:'周末逃离杭州',city:'杭州',members:12840,summary:'分享杭州出发两天一夜的真实路线，拒绝把周末浪费在路上。',emoji:'🌲',tags:['周末','江浙沪','自驾']},
  {id:'solo-travel',name:'一个人去旅行',city:'全球',members:9360,summary:'独自出发时的安全、住宿、拍照与陌生城市经验。',emoji:'🎒',tags:['独行','安全','女性旅行']},
  {id:'world-routes',name:'环球路线研究所',city:'全球',members:6720,summary:'研究跨国路线、长途交通、签证衔接和长期旅行预算。',emoji:'🌍',tags:['环球','路线','预算']}
]
