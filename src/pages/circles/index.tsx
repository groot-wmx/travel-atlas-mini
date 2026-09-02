import Taro from "@tarojs/taro";
import { Input, Text, View } from "@tarojs/components";
import { useMemo, useState } from "react";
import { circles } from "../../data/circles";
import "./index.scss";

export default function Circles() {
  const [query, setQuery] = useState("");
  const result = useMemo(
    () =>
      circles.filter((circle) =>
        `${circle.name}${circle.city}${circle.summary}${circle.tags.join("")}`.includes(
          query,
        ),
      ),
    [query],
  );
  return (
    <View className='page circles-page'>
      <View className='circles-hero safe'>
        <Text className='kicker'>TRAVEL CIRCLES</Text>
        <Text className='title'>找到你的同路人</Text>
        <Text className='muted'>
          围绕城市、路线和旅行方式，交换亲自走过的经验。
        </Text>
        <View className='search'>
          <Text>⌕</Text>
          <Input
            value={query}
            onInput={(e) => setQuery(e.detail.value)}
            placeholder='搜索旅圈、城市或话题'
          />
        </View>
      </View>
      <View className='safe circle-list'>
        {result.map((circle, index) => (
          <View
            className='circle-card panel'
            key={circle.id}
            onClick={() =>
              Taro.navigateTo({ url: `/pages/circle/index?id=${circle.id}` })
            }
          >
            <Text className='circle-number'>0{index + 1}</Text>
            <View className='circle-copy'>
              <Text className='circle-name'>{circle.name}</Text>
              <Text className='circle-city'>
                {circle.city} · {circle.members.toLocaleString()} 位同行者
              </Text>
              <Text className='circle-summary'>{circle.summary}</Text>
              <View>
                {circle.tags.map((tag) => (
                  <Text className='chip' key={tag}>
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
            <Text>›</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
