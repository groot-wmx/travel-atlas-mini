import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import type { Place } from '../data/places'
import './PlaceCard.scss'

export default function PlaceCard({place,compact=false}:{place:Place;compact?:boolean}){
  const openPlace=()=>{const url=`/pages/place/index?id=${place.id}`;Taro.navigateTo({url}).catch(()=>Taro.redirectTo({url}))}
  return <View className={`place-card ${compact?'compact':''}`} hoverClass='place-card-pressed' onClick={openPlace}>
    <View className='place-visual'>
      <Image className='place-image' src={place.image} mode='aspectFill' />
      <View className='image-shade' />
      <Text className='place-country'>{place.country}</Text>
      <Text className='story-no'>{place.storyNo}</Text>
    </View>
    <View className='place-copy'>
      <Text className='place-meta'>{place.city} · {place.category}</Text>
      <Text className='place-name'>{place.name}</Text>
      <Text className='place-summary'>{place.summary}</Text>
      <View className='place-foot'><Text className='rating'>★ {place.rating}</Text><Text>{place.reviews.toLocaleString()} 条景评</Text><Text>{place.duration}</Text></View>
      <Text className='place-enter'>查看详情 →</Text>
    </View>
  </View>
}
