import Taro, { useDidShow } from "@tarojs/taro";
import { Button, Image, Text, View } from "@tarojs/components";
import { useState } from "react";
import { circles } from "../../data/circles";
import { getPlace } from "../../data/places";
import { getBeen, getFollowed, getTrip, getWants } from "../../lib/storage";
import "./index.scss";

export default function Me() {
  const [tick, setTick] = useState(0);
  useDidShow(() => setTick((x) => x + 1));
  const wants = getWants(),
    been = getBeen(),
    trip = getTrip(),
    followed = getFollowed();
  void tick;
  return (
    <View className='page me-page'>
      <View className='me-hero safe'>
        <View className='avatar'>旅</View>
        <View>
          <Text className='kicker'>LV TU MEMBER</Text>
          <Text className='title'>旅行者</Text>
          <Text className='muted'>登录后可在不同设备同步旅程。</Text>
        </View>
      </View>
      <View className='safe me-main'>
        <View className='stats panel'>
          <View>
            <Text>{wants.length}</Text>
            <Text>想去</Text>
          </View>
          <View>
            <Text>{been.length}</Text>
            <Text>去过</Text>
          </View>
          <View>
            <Text>{trip.length}</Text>
            <Text>行程地点</Text>
          </View>
          <View>
            <Text>{followed.length}</Text>
            <Text>旅圈</Text>
          </View>
        </View>
        <Button
          className='primary login'
          onClick={() =>
            Taro.showToast({ title: "等待接入小程序 AppID", icon: "none" })
          }
        >
          微信快捷登录
        </Button>
        <Text className='section-title block'>当前行程</Text>
        {trip.length ? (
          trip.map((item) => {
            const place = getPlace(item.placeId);
            return (
              <View
                className='me-row panel'
                key={item.id}
                onClick={() =>
                  Taro.navigateTo({ url: `/pages/place/index?id=${place.id}` })
                }
              >
                <Image className='place-thumb' src={place.image} mode='aspectFill' />
                <View>
                  <Text className='name'>{place.name}</Text>
                  <Text className='muted'>
                    DAY {item.day} · {item.time}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View className='empty panel'>
            还没有行程地点，去目的地页挑一个吧。
          </View>
        )}
        <Text className='section-title block'>我加入的旅圈</Text>
        {followed.length ? (
          followed.map((id) => {
            const circle = circles.find((item) => item.id === id);
            return circle ? (
              <View
                className='me-row panel'
                key={id}
                onClick={() =>
                  Taro.navigateTo({ url: `/pages/circle/index?id=${id}` })
                }
              >
                <Text className='circle-mark'>旅</Text>
                <View>
                  <Text className='name'>{circle.name}</Text>
                  <Text className='muted'>
                    {circle.members.toLocaleString()} 位同行者
                  </Text>
                </View>
              </View>
            ) : null;
          })
        ) : (
          <View className='empty panel'>还没有加入旅圈。</View>
        )}
        <View className='legal'>
          <Text>用户协议</Text>
          <Text>隐私保护指引</Text>
          <Text>内容规范</Text>
          <Text>举报与反馈</Text>
        </View>
      </View>
    </View>
  );
}
