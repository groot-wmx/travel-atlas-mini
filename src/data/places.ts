export type Place={id:string;name:string;city:string;country:string;continent:string;category:string;rating:number;reviews:number;duration:string;summary:string;image:string;storyNo:string;tags:string[]}

export const places:Place[]=[
  {id:'dali-old-town',name:'大理古城',city:'大理',country:'中国',continent:'亚洲',category:'古城',rating:4.7,reviews:3281,duration:'半天',summary:'在苍山脚下慢慢走，避开主街，也能遇见安静的白族院落。',image:'/places/dali.jpg',storyNo:'CN·001',tags:['古城','人文','慢旅行']},
  {id:'west-lake',name:'西湖风景名胜区',city:'杭州',country:'中国',continent:'亚洲',category:'湖泊',rating:4.8,reviews:8920,duration:'1天',summary:'从北山街走到杨公堤，把热门景观和当地人的日常串成一条线。',image:'/places/west-lake.jpg',storyNo:'CN·002',tags:['湖泊','徒步','城市']},
  {id:'forbidden-city',name:'故宫博物院',city:'北京',country:'中国',continent:'亚洲',category:'博物馆',rating:4.9,reviews:12640,duration:'1天',summary:'提前预约，沿中轴线进入，再把时间留给东西六宫的细节。',image:'/places/forbidden-city.jpg',storyNo:'CN·003',tags:['建筑','历史','博物馆']},
  {id:'jiuzhaigou',name:'九寨沟风景名胜区',city:'阿坝',country:'中国',continent:'亚洲',category:'自然',rating:4.9,reviews:7680,duration:'1-2天',summary:'高海拔山谷里的湖泊、瀑布与森林，四季有完全不同的颜色。',image:'/places/jiuzhaigou.jpg',storyNo:'CN·004',tags:['自然','摄影','徒步']},
  {id:'arc-de-triomphe',name:'巴黎凯旋门',city:'巴黎',country:'法国',continent:'欧洲',category:'建筑',rating:4.6,reviews:45321,duration:'2小时',summary:'登上拱顶俯瞰十二条放射状大道，日落前后是最值得停留的时间。',image:'/places/paris.jpg',storyNo:'FR·001',tags:['建筑','城市','日落']},
  {id:'sensoji',name:'浅草寺',city:'东京',country:'日本',continent:'亚洲',category:'寺庙',rating:4.5,reviews:28760,duration:'2-3小时',summary:'从雷门穿过仲见世，清晨抵达可以看到更接近生活的浅草。',image:'/places/tokyo.jpg',storyNo:'JP·001',tags:['寺庙','街区','美食']},
  {id:'colosseum',name:'罗马斗兽场',city:'罗马',country:'意大利',continent:'欧洲',category:'遗址',rating:4.7,reviews:67210,duration:'3小时',summary:'把斗兽场、古罗马广场和帕拉蒂尼山放在同一天理解古城。',image:'/places/colosseum.jpg',storyNo:'IT·001',tags:['遗址','历史','建筑']},
  {id:'machu-picchu',name:'马丘比丘',city:'乌鲁班巴',country:'秘鲁',continent:'美洲',category:'遗址',rating:4.9,reviews:19560,duration:'1天',summary:'云雾中的印加遗址，需要提前处理门票、火车和分时入场。',image:'/places/machu-picchu.jpg',storyNo:'PE·001',tags:['遗址','徒步','世界遗产']}
]
export const getPlace=(id?:string)=>places.find(place=>place.id===id)??places[0]
