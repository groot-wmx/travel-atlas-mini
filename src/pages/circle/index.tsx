import Taro, { useLoad, useShareAppMessage } from "@tarojs/taro";
import { Button, Input, Text, Textarea, View } from "@tarojs/components";
import { useState } from "react";
import { circles } from "../../data/circles";
import { getFollowed, toggleFollow } from "../../lib/storage";
import "./index.scss";

const topics = [
  {
    tag: "路线诊断",
    title: "南美三国 28 天路线，求帮忙做减法",
    author: "远山",
    reply: 64,
    content: "秘鲁、玻利维亚、智利，现在行程太满，希望有走过的人帮忙看看。",
  },
  {
    tag: "交通",
    title: "淡季欧洲跨国火车票怎么买更划算",
    author: "Mia",
    reply: 91,
    content: "对比了通票和分段购买，整理了几个容易忽略的条件。",
  },
  {
    tag: "预算",
    title: "长期旅行的月预算模板分享",
    author: "阿辰",
    reply: 128,
    content: "把固定费用、移动日成本和不可预见支出拆开记录，会清晰很多。",
  },
];
export default function CircleDetail() {
  const [id, setId] = useState(""),
    [tick, setTick] = useState(0),
    [composer, setComposer] = useState(false),
    [title, setTitle] = useState(""),
    [content, setContent] = useState("");
  useLoad((options) => setId(options.id || ""));
  const circle = circles.find((item) => item.id === id) || circles[0];
  const followed = getFollowed().includes(circle.id);
  useShareAppMessage(() => ({
    title: `${circle.name}｜旅图旅圈`,
    path: `/pages/circle/index?id=${circle.id}`,
  }));
  const publish = () => {
    if (title.length < 3 || content.length < 10)
      return Taro.showToast({ title: "请把话题写完整", icon: "none" });
    const drafts = Taro.getStorageSync(`lvtu-mini-circle-${circle.id}`) || [];
    Taro.setStorageSync(`lvtu-mini-circle-${circle.id}`, [
      { title, content, id: Date.now() },
      ...drafts,
    ]);
    setComposer(false);
    setTitle("");
    setContent("");
    Taro.showToast({ title: "话题已保存" });
  };
  void tick;
  return (
    <View className='page circle-page'>
      <View className='circle-cover safe'>
        <Text className='circle-edition'>TRAVEL CIRCLE · {circle.city}</Text>
        <Text className='kicker'>旅图旅圈</Text>
        <Text className='title'>{circle.name}</Text>
        <Text className='summary'>{circle.summary}</Text>
        <View className='row between'>
          <Text>{circle.members.toLocaleString()} 位同行者</Text>
          <Button
            className={followed ? "ghost" : "primary"}
            onClick={() => {
              toggleFollow(circle.id);
              setTick((x) => x + 1);
            }}
          >
            {followed ? "已加入" : "加入旅圈"}
          </Button>
        </View>
      </View>
      <View className='safe topics'>
        <View className='row between topic-head'>
          <Text className='section-title'>正在讨论</Text>
          <Button className='primary' onClick={() => setComposer(true)}>
            发起话题
          </Button>
        </View>
        {topics.map((topic) => (
          <View className='topic panel' key={topic.title}>
            <Text className='chip'>{topic.tag}</Text>
            <Text className='topic-title'>{topic.title}</Text>
            <Text className='topic-content'>{topic.content}</Text>
            <View className='row between topic-foot'>
              <Text>{topic.author}</Text>
              <Text>{topic.reply} 条回复</Text>
            </View>
          </View>
        ))}
      </View>
      {composer && (
        <View className='composer-mask'>
          <View className='composer'>
            <Text className='section-title'>发起新话题</Text>
            <Input
              className='field'
              value={title}
              maxlength={60}
              placeholder='话题标题'
              onInput={(e) => setTitle(e.detail.value)}
            />
            <Textarea
              className='field textarea'
              value={content}
              maxlength={2000}
              placeholder='把问题、路线或经验写具体…'
              onInput={(e) => setContent(e.detail.value)}
            />
            <View className='row'>
              <Button className='ghost' onClick={() => setComposer(false)}>
                取消
              </Button>
              <Button className='primary' onClick={publish}>
                发布
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
