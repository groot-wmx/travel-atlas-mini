import Taro from '@tarojs/taro'

export type TripItem={id:string;placeId:string;day:number;time:string;note:string}
const WANT='lvtu-mini-want',BEEN='lvtu-mini-been',TRIP='lvtu-mini-trip',FOLLOW='lvtu-mini-follow'
const read=<T,>(key:string,fallback:T):T=>{try{return Taro.getStorageSync(key)||fallback}catch{return fallback}}
const write=<T,>(key:string,value:T)=>Taro.setStorageSync(key,value)
export const getWants=()=>read<string[]>(WANT,[])
export const getBeen=()=>read<string[]>(BEEN,[])
export const toggleWant=(id:string)=>{const value=getWants();write(WANT,value.includes(id)?value.filter(x=>x!==id):[...value,id])}
export const toggleBeen=(id:string)=>{const value=getBeen();write(BEEN,value.includes(id)?value.filter(x=>x!==id):[...value,id])}
export const getTrip=()=>read<TripItem[]>(TRIP,[])
export const addTrip=(placeId:string)=>{const value=getTrip();if(value.some(item=>item.placeId===placeId))return false;write(TRIP,[...value,{id:`${Date.now()}`,placeId,day:1,time:'09:30',note:''}]);return true}
export const updateTrip=(items:TripItem[])=>write(TRIP,items)
export const getFollowed=()=>read<string[]>(FOLLOW,[])
export const toggleFollow=(id:string)=>{const value=getFollowed();write(FOLLOW,value.includes(id)?value.filter(x=>x!==id):[...value,id])}
