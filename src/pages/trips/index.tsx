import Taro, { useDidShow } from '@tarojs/taro'
import { Button, Image, Input, Picker, Text, Textarea, View } from '@tarojs/components'
import { useState } from 'react'
import { getPlace, places } from '../../data/places'
import { addTrip, getTrip, TripItem, updateTrip } from '../../lib/storage'
import './index.scss'

const calendarDays = [
  { day: 1, date: '18', week: '周五' },
  { day: 2, date: '19', week: '周六' },
  { day: 3, date: '20', week: '周日' },
  { day: 4, date: '21', week: '周一' },
  { day: 5, date: '22', week: '周二' },
]

export default function Trips() {
  const [items, setItems] = useState<TripItem[]>([])
  const [day, setDay] = useState(1)
  const [candidate, setCandidate] = useState(0)
  const sync = () => setItems(getTrip())
  useDidShow(sync)

  const selectedDate = calendarDays.find((item) => item.day === day) || calendarDays[0]
  const active = items.filter((item) => item.day === day).sort((a, b) => a.time.localeCompare(b.time))
  const available = places.filter((place) => !items.some((item) => item.placeId === place.id))
  const plannedDays = new Set(items.map((item) => item.day)).size

  const patch = (id: string, data: Partial<TripItem>) => {
    const next = items.map((item) => item.id === id ? { ...item, ...data } : item)
    updateTrip(next)
    setItems(next)
  }
  const remove = (id: string) => {
    const next = items.filter((item) => item.id !== id)
    updateTrip(next)
    setItems(next)
  }
  const addPlace = () => {
    const selected = available[candidate] || available[0]
    if (!selected || !addTrip(selected.id)) return
    const next = getTrip()
    const last = next[next.length - 1]
    updateTrip(next.map((item) => item.id === last.id ? { ...item, day } : item))
    sync()
    setCandidate(0)
  }

  return <View className='page trip-page'>
    <View className='trip-hero safe'>
      <View className='row between trip-topline'><Text className='kicker'>MY ITINERARY</Text><Text className='month-code'>SEP · 2026</Text></View>
      <Text className='title'>我的下一段旅程</Text>
      <Text className='trip-name'>中国地图故事 · 5 日</Text>
      <View className='trip-overview row'>
        <View><Text className='overview-number'>{items.length}</Text><Text className='overview-label'>个地点</Text></View>
        <View><Text className='overview-number'>{plannedDays}</Text><Text className='overview-label'>天有安排</Text></View>
        <View className='overview-copy'><Text>9月18日—22日</Text><Text>把收藏排进日程，就离出发更近一步。</Text></View>
      </View>
    </View>

    <View className='calendar-sheet'>
      <View className='calendar-month safe row between'><Text className='calendar-title'>2026年 9月</Text><Text className='calendar-range'>行程日历</Text></View>
      <View className='week-strip safe'>
        {calendarDays.map((item) => <View className={`calendar-day ${day === item.day ? 'active' : ''}`} key={item.day} onClick={() => setDay(item.day)}>
          <Text className='weekday'>{item.week}</Text>
          <Text className='date-number'>{item.date}</Text>
          <Text className='day-count'>{items.filter((trip) => trip.day === item.day).length || '—'}</Text>
        </View>)}
      </View>
    </View>

    <View className='safe schedule-main'>
      <View className='schedule-heading row between'>
        <View><Text className='schedule-date'>9月{selectedDate.date}日 · {selectedDate.week}</Text><Text className='schedule-summary'>{active.length ? `${active.length} 个地点，按时间顺序排列` : '这一天还没有安排'}</Text></View>
        <Text className='day-badge'>DAY {String(day).padStart(2, '0')}</Text>
      </View>

      {active.length ? <View className='timeline'>
        {active.map((item, index) => {
          const place = getPlace(item.placeId)
          return <View className='timeline-row' key={item.id}>
            <View className='time-column'><Input className='time-input' type='text' value={item.time} onInput={(e) => patch(item.id, { time: e.detail.value })} /><Text className='time-zone'>当地时间</Text></View>
            <View className='timeline-rail'><View className='timeline-dot' />{index < active.length - 1 && <View className='timeline-line' />}</View>
            <View className='schedule-card'>
              <Image className='schedule-photo' src={place.image} mode='aspectFill' onClick={() => Taro.navigateTo({ url: `/pages/place/index?id=${place.id}` })} />
              <View className='schedule-copy'>
                <View className='row between'><Text className='schedule-place' onClick={() => Taro.navigateTo({ url: `/pages/place/index?id=${place.id}` })}>{place.name}</Text><Text className='remove' onClick={() => remove(item.id)}>删除</Text></View>
                <Text className='schedule-meta'>{place.city} · 建议游玩 {place.duration}</Text>
                <Textarea className='note' value={item.note} maxlength={160} placeholder='添加交通、预约或碰面提醒…' onInput={(e) => patch(item.id, { note: e.detail.value })} />
              </View>
            </View>
          </View>
        })}
      </View> : <View className='empty-day'>
        <Text className='empty-date'>{selectedDate.date}</Text>
        <View><Text className='empty-title'>留一天给未知的风景</Text><Text className='empty-copy'>从下方添加一个地点，日程会自动出现在时间轴上。</Text></View>
      </View>}

      <View className='add-schedule'>
        <View className='add-heading'><Text className='add-kicker'>ADD TO THIS DAY</Text><Text className='add-title'>添加到 9月{selectedDate.date}日</Text></View>
        {available.length ? <View className='add-row'>
          <Picker mode='selector' range={available.map((place) => `${place.city} · ${place.name}`)} value={candidate} onChange={(e) => setCandidate(Number(e.detail.value))}>
            <View className='picker'><Text className='picker-label'>选择地点</Text><Text className='picker-value'>{available[candidate]?.name || available[0]?.name}</Text></View>
          </Picker>
          <Button className='primary add-button' onClick={addPlace}>加入日程</Button>
        </View> : <Text className='all-planned'>全部目的地都已经加入行程。</Text>}
      </View>
    </View>
  </View>
}
