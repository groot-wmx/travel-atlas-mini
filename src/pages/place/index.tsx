import Taro,{useLoad,useShareAppMessage} from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { useState } from 'react'
import { getPlace } from '../../data/places'
import { addTrip,getBeen,getWants,toggleBeen,toggleWant } from '../../lib/storage'
import './index.scss'

const mockReviews=[{author:'小满',rating:5,content:'傍晚到达最舒服，光线柔和，人群也开始散去。建议提前看好入口和预约规则。',date:'2026-07-18'},{author:'远山',rating:4,content:'值得专程来，但周边交通和排队时间要留出余量，不建议把当天安排得太满。',date:'2026-06-29'}]

export default function PlaceDetail(){
  const [id,setId]=useState('');const [tick,setTick]=useState(0)
  useLoad(options=>setId(options.id||''))
  const place=getPlace(id);const wanted=getWants().includes(place.id),been=getBeen().includes(place.id)
  useShareAppMessage(()=>({title:`${place.name}｜真实景评与旅行建议`,path:`/pages/place/index?id=${place.id}`}))
  const refresh=()=>setTick(x=>x+1);void tick
  return <View className='page place-page'>
    <View className='place-hero'><Image className='place-photo' src={place.image} mode='aspectFill' /><View className='place-shade' /><Text className='place-story-no'>{place.storyNo}</Text><View className='hero-overlay'><Text className='chip light'>{place.country} · {place.city}</Text><Text className='place-title'>{place.name}</Text><Text className='place-sub'>{place.category} · 建议游玩 {place.duration}</Text></View></View>
    <View className='safe place-main'>
      <View className='score panel'><View><Text className='score-num'>{place.rating}</Text><Text className='stars'>★★★★★</Text><Text className='muted'>{place.reviews.toLocaleString()} 条景评</Text></View><View className='score-bars'><Text>景色 4.8</Text><Text>体验 4.6</Text><Text>便利 4.4</Text></View></View>
      <Text className='summary'>{place.summary}</Text><View className='tag-row'>{place.tags.map(tag=><Text className='chip' key={tag}>{tag}</Text>)}</View>
      <View className='action-grid'><Button className={wanted?'primary':'ghost'} onClick={()=>{toggleWant(place.id);refresh()}}>{wanted?'已想去':'♡ 想去'}</Button><Button className={been?'primary':'ghost'} onClick={()=>{toggleBeen(place.id);refresh()}}>{been?'去过了':'✓ 去过'}</Button><Button className='primary wide' onClick={()=>{const added=addTrip(place.id);Taro.showToast({title:added?'已加入行程':'已经在行程中',icon:'none'})}}>＋ 加入行程</Button></View>
      <View className='review-head row between'><Text className='section-title'>旅行者景评</Text><Text className='write' onClick={()=>Taro.navigateTo({url:`/pages/review/index?id=${place.id}`})}>写景评 →</Text></View>
      {mockReviews.map(review=><View className='review panel' key={review.author}><View className='row between'><Text className='author'>{review.author}</Text><Text className='stars small'>{'★'.repeat(review.rating)}</Text></View><Text className='review-content'>{review.content}</Text><Text className='review-date'>{review.date} 到访</Text></View>)}
    </View>
  </View>
}
