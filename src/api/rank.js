import Requester from "../services/requester"
import config from './config'

class RankApi {

    // 直推表
    static getPushList(query) {
        return Requester.get(config.apiDomain + 'push_list', query)
            .then(res => {
                if (res.status !== '1') return

                const pushList = res.data.list && res.data.list.map(n => ({
                    phone: n.phone || '',                // 用户昵称（手机号）
                    orderCount: n.order_count || '',     // 投注次数
                    pushCount: n.push_count || '',       // 直推个数
                    level: n.level || ''                 // 我的头衔
                }))

                return pushList
            }).catch(err => {
                console.error(err)
            })
    }

    // 龙虎榜历史
    static getDayPushHistory(query){
        return Requester.get(config.apiDomain + 'day_push_history', query)
    }

    // 我的今日直推
    static getMyDayPushCount(query){
        return Requester.get(config.apiDomain + 'my_day_push_count', query)
            .then(res => {
               if (res.status !== '1') return

                return data ={
                    pushCount: res.data && res.data.push_count || 0     // 直推数
                }
            }).catch(err => {
               console.error(err)
            })
    }

    // 我的龙虎榜  （待修正地址）
    static getWinnerList(query) {
        return Requester.get(config.apiDomain + 'my_day_push_count', query)
            .then(res => {
                if (res.status !== '1') return

                const list = res.data.list && res.data.list.map(n => ({
                    date: n.date || '',                    // 日期
                    eth: n.eth || '',                      // 奖励的eth
                    inc: n.inc || '',                      // 奖励的inc
                    status: n.status || '',                // 中奖状态：0为未中奖,1-5为中奖等级
                    pushCount: n.push_count || '',         // 直推个数
                }))

                return list
            }).catch(err => {
                console.error(err)
            })
    }

    // 直推龙虎榜奖池
    static getDayPushBonus(query){
        return Requester.get(config.apiDomain + 'day_push_bonus', query)
            .then(res => {
                if (res.status !== '1') return
                return list = {
                    incAmount: res.data && res.data.inc_amount || 0,  // inc数量
                    ethAmount: res.data && res.data.eth_amount || 0   // eth数量
                }

            }).catch(err => {
                console.error(err)
            })
    }
}

export default RankApi
