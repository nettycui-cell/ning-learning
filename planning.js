/* Stable event IDs keep preparation progress attached to each occurrence. */
(function(root){
'use strict';
const schedule={
  version:1,updated:'2026-10-04',timezone:'Europe/Berlin',
  source:'根据你告知的安排：运动暂按每周重复；旅行、10/4 徒步与 10/5 学院注册按指定日期安排。',
  recurring:[
    {id:'friday-fencing',weekday:5,from:'2026-09-25',scene:'fencing',title:'Fencing · 击剑',kind:'sport'},
    {id:'saturday-kempo',weekday:6,from:'2026-09-25',scene:'shaolin-kempo',title:'Shaolin Kempo',kind:'sport'},
    {id:'sunday-archery',weekday:0,from:'2026-09-25',scene:'archery',title:'Archery · 射箭',kind:'sport'}
  ],
  once:[
    {id:'enschede-20260926',date:'2026-09-26',scene:'enschede',title:'Enschede · 周末旅行',kind:'travel'},
    {id:'cologne-20260927',date:'2026-09-27',scene:'cologne',title:'Köln 科隆 · 周末旅行',kind:'travel'},
    {id:'hiking-20261004',date:'2026-10-04',scene:'hiking',title:'Wandern · 徒步',kind:'outdoor',priority:10},
    {id:'college-registration-20261005',date:'2026-10-05',scene:'college-registration',title:'学院注册 · DE / EN',kind:'campus',priority:10}
  ],
  // Future calendar changes can override one occurrence without rewriting history.
  exceptions:[]
};
const days=['周日','周一','周二','周三','周四','周五','周六'];
const shift=(d,n)=>{const x=new Date(d+'T12:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10)};
const distance=(a,b)=>Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000);
const weekday=d=>days[new Date(d+'T12:00:00Z').getUTCDay()];
function eventsOn(date){
  const dow=new Date(date+'T12:00:00Z').getUTCDay();
  const events=[...schedule.recurring.filter(x=>x.weekday===dow&&date>=x.from&&(!x.until||date<=x.until)),...schedule.once.filter(x=>x.date===date)];
  return events.filter(x=>!schedule.exceptions.some(e=>e.id===x.id&&e.date===date&&e.cancelled)).map(x=>({...x,...schedule.exceptions.find(e=>e.id===x.id&&e.date===date),date})).sort((a,b)=>(b.priority||0)-(a.priority||0));
}
const upcoming=(start,count=14)=>Array.from({length:count},(_,i)=>shift(start,i)).flatMap(eventsOn);
const find=(id,date)=>eventsOn(date).find(e=>e.id===id);
const quick={fencing:[2,10,18,32,36],'shaolin-kempo':[2,8,18,26,28],archery:[4,12,22,28,32],enschede:[2,8,11,20,35],cologne:[3,8,20,30,42],hiking:[0,11,16,32,56],'college-registration':[0,12,24,34,66]};
const goals={fencing:'先听懂口令，再确认装备与练习节奏。','shaolin-kempo':'介绍自己、跟上方向，清楚表达接触边界。',archery:'确认许可、听懂停止与等待，不懂就及时问。',enschede:'确认跨境车票，问路、逛市场，并顺利返程。',cologne:'确认车次和参观安排，再练问路、用餐与返程。',hiking:'会问路线、跟上队伍、表达不适，确认返程。','college-registration':'用德语和英语说明来意，核对材料、期限与下一步。'};
const kindLabel=event=>({sport:'每周固定运动',travel:'本次旅行',outdoor:'本次户外活动',campus:'本次学院事务'}[event.kind]||'本次安排');
function stages(event,today){
  const gap=distance(today,event.date),sport=event.kind==='sport';
  const round=Math.floor(Math.max(0,distance('2026-09-25',event.date))/7)%3;
  const warmups=['先看英文再说德语，读熟下面 5 句；听一遍，再脱稿一遍。','本周进阶：遮住英文，分别扮演你和对方，完成两轮问答。','本周进阶：改掉一个条件（第一次／再来、没听懂／需暂停），练习追问。'];
  return [
    {id:'before',title:'提前预习 · 5–10 min',text:sport?warmups[round]:event.kind==='campus'?'把来意、材料、期限和下一步各用德语与英语说一遍；选符合自己情况的注册类型。':event.kind==='outdoor'?'先练集合、路线难度、问路、请求休息，再练一段返程或求助对话。':'练熟下面 5 句，再从完整场景挑一段交通或问路对话。',label:'我已完成出发前预习',suggested:gap>0},
    {id:'day',title:(sport?'上课前':event.kind==='campus'?'办理前':'出发前')+'热身 · 2 min',text:event.kind==='campus'?'先用德语说明来意；必要时切换英语，并练习复述对方给出的下一步。':'不看英文，说出自己的提问，并听懂对方一种可能的回答。',label:'我已完成当天开口热身',suggested:gap===0},
    {id:'after',title:'结束后复盘 · 3 min',text:event.kind==='campus'?'复述今天办完了什么、仍缺什么、准确期限及联系部门；收藏没听懂的表达。':'从今天真正遇到的对话中，收藏一句没听懂的，再用德语复述一次经历。',label:'我已完成事后复盘',suggested:gap<0}
  ];
}
root.NING_PLANNER={schedule,shift,distance,weekday,eventsOn,upcoming,find,quick,goals,kindLabel,stages};
})(typeof window==='undefined'?globalThis:window);
