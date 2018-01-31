const key='goods'

// 返回保存在本地的商品信息
export const getLocalGoods = ()=>{
    // 手动清除本地localstorage
    // localStorage.clear()
    const localGoods = JSON.parse(localStorage.getItem(key)||'{}')
    
    return localGoods
}

// 返回总的商品数
export const getTotalCount = ()=>{
    const localGoods = getLocalGoods()
    let totalCount = 0
    for (const key in localGoods) {
        totalCount += localGoods[key]
    }
    return totalCount
}


// 增加数据到本地,并返回总数量
export const addLocalGoods=(goodsObj)=>{
    const localGoods = getLocalGoods()
    if(localGoods[goodsObj.goodsId]){
        localGoods[goodsObj.goodsId] += goodsObj.count
    }else{
        localGoods[goodsObj.goodsId] = goodsObj.count
    }
    localStorage.setItem(key,JSON.stringify(localGoods))
    // 返回总数量,因为在这个项目中唯一用到vuex的就是购物车里,且都是总数量的问题
    return getTotalCount()
}

// 修改
export const updateLocalGoods=(changedGoods)=>{
    const localGoods = getLocalGoods()
    localGoods[changedGoods.goodsId] = changedGoods.count
    localStorage.setItem(key,JSON.stringify(localGoods))
    return getTotalCount()
}

// 删除
export const deleteLocalGoods=(goodsId)=>{
    const localGoods = getLocalGoods()
    delete localGoods[goodsId]
    localStorage.setItem(key,JSON.stringify(localGoods))
    return getTotalCount()
}
