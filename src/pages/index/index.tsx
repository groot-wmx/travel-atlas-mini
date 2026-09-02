import Taro,{useShareAppMessage,useShareTimeline} from '@tarojs/taro'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import { circles } from '../../data/circles'
import { places } from '../../data/places'
import PlaceCard from '../../components/PlaceCard'
import './index.scss'

export default function Index(){
  const featured=places[0]
  useShareAppMessage(()=>({title:'旅图｜每一次抵达，都成为地图上的故事',path:'/pages/index/index'}))
  useShareTimeline(()=>({title:'旅图｜发现真实旅行经验'}))
  const explore=()=>Taro.switchTab({url:'/pages/destinations/index'})
  const openCircle=(id:string)=>{const url=`/pages/circle/index?id=${id}`;Taro.navigateTo({url}).catch(()=>Taro.redirectTo({url}))}
  const openCircles=()=>{const url='/pages/circles/index';Taro.navigateTo({url}).catch(()=>Taro.redirectTo({url}))}
  return <View className='page home'>
    <View className='cover-story' onClick={()=>Taro.navigateTo({url:`/pages/place/index?id=${featured.id}`})}>
      <Image className='cover-image' src={featured.image} mode='aspectFill' />
      <View className='cover-shade' />
      <View className='cover-nav safe'><Text className='brand'>旅图<Text className='brand-dot'>°</Text></Text><Text className='cover-issue'>ATLAS / 01</Text></View>
      <View className='cover-copy safe'>
        <Text className='cover-kicker'>25.6065° N · 100.2676° E</Text>
        <Text className='hero-title'>每一次抵达，{`\n`}都成为地图上的故事。</Text>
        <Text className='cover-summary'>本周抵达大理：沿着苍山与洱海，找到古城主街之外的另一种慢生活。</Text>
        <View className='cover-meta'><Text>4.7 旅行者评分</Text><Text>3,281 条景评</Text><Text>打开故事 →</Text></View>
      </View>
    </View>

    <View className='journey-ribbon safe'>
      <View className='route-stop active'><Text className='stop-dot' /><Text className='stop-code'>01 · 发现</Text><Text className='stop-copy'>找一个想去的地方</Text></View>
      <View className='route-line' />
      <View className='route-stop'><Text className='stop-dot' /><Text className='stop-code'>02 · 规划</Text><Text className='stop-copy'>排进下一段旅程</Text></View>
      <View className='route-line' />
      <View className='route-stop'><Text className='stop-dot' /><Text className='stop-code'>03 · 记录</Text><Text className='stop-copy'>留下亲自走过的答案</Text></View>
    </View>

    <View className='quick-actions safe'>
      <Button className='primary' onClick={explore}>开始探索</Button>
      <Button className='ghost' onClick={()=>Taro.switchTab({url:'/pages/trips/index'})}>打开行程日历</Button>
    </View>

    <View className='map-panel safe'>
      <View className='map-heading row between'><View><Text className='kicker'>EXPLORE CHINA</Text><Text className='section-title map-title'>从中国地图开始</Text></View><Text className='more' onClick={explore}>34 省区 →</Text></View>
      <Text className='map-desc'>首页从中国地图开始，内容不设边界。点亮一个地区，查看旅行者亲自走过的路线。</Text>
      <View className='china-map' onClick={explore}>
        <View className='province northwest' /><View className='province north' /><View className='province southwest' /><View className='province east' /><View className='province tibet' /><View className='province south' />
        <View className='map-route route-one' /><View className='map-route route-two' />
        <Text className='map-label label-one'>杭州 / 出发点</Text><Text className='map-label label-two'>12,846 个故事</Text>
        <View className='map-pin pin-hz' /><View className='map-pin pin-dl' />
      </View>
      <View className='map-bottom row between'><Text>北京 / 杭州 / 成都 / 大理</Text><Text className='live'>● 128 人今天抵达</Text></View>
    </View>

    <View className='home-section safe'>
      <View className='row between section-head'><View><Text className='kicker'>EDITOR&apos;S PICKS</Text><Text className='section-title'>本周值得抵达</Text></View><Text className='more' onClick={explore}>浏览全部 →</Text></View>
      <View className='cards'>{places.slice(1,5).map(place=><PlaceCard place={place} compact key={place.id} />)}</View>
    </View>

    <View className='circle-strip'>
      <View className='safe'><Text className='kicker light-kicker'>TRAVEL CIRCLES</Text><Text className='section-title circle-title'>和走过同一条路的人聊聊。</Text><Text className='circle-lead'>旅圈按城市、路线和旅行方式聚合，让经验更具体，也让计划少走弯路。</Text>
        <ScrollView scrollX enhanced className='circle-scroll'>{circles.map((circle,index)=><View className='circle-mini' key={circle.id} onClick={()=>openCircle(circle.id)}><Text className='circle-index'>0{index+1}</Text><Text className='circle-city'>{circle.city} · {circle.members.toLocaleString()} 位同行者</Text><Text className='circle-name'>{circle.name}</Text><Text className='circle-summary'>{circle.summary}</Text><Button className='circle-enter' onClick={(event)=>{event.stopPropagation();openCircle(circle.id)}}>进入旅圈 →</Button></View>)}</ScrollView>
        <Button className='circle-more' onClick={openCircles}>浏览全部旅圈</Button>
      </View>
    </View>
  </View>
}
