function setItem (name, item) {
  localStorage.setItem(name, JSON.stringify(item))
}
function getItem (name) {
  return JSON.parse(localStorage.getItem(name) || '[]')
}

export default {
  state: {
    // car: [ {id:商品id, count:购买数量, selected:是否选中},{},{}]
    car: getItem('car'),
    // buy数组中存放的是需要购买的商品，即选中的商品
    buy: getItem('buy')
  },
  // mutations,里面装着一些改变数据方法的集合
  mutations: {
    // 添加商品到购物车
    addShopcart (state, goodsinfo) {
      // 已经有商品就要增加数量即可，否则添加商品
      // 当flag为false时表示购物车中没有相同的商品
      let flag = false
      // 如果有就增加数量 some 遍历
      state.car.some(item => {
        if (parseInt(item.id) === parseInt(goodsinfo.id)) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        // 购物车没有相同商品
        state.car.push(goodsinfo)
      }
      // 调用setItem保存数据到localstorage
      setItem('car', state.car)
    },
    // 修改购买数量
    updateGoodsInfo (state, goodsinfo) {
      state.car.some(item => {
        if (parseInt(item.id) === parseInt(goodsinfo.id)) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      setItem('car', state.car)
    },
    // 修改商品选中状态
    updateGoodsSelected (state, goodsinfo) {
      state.car.some(item => {
        if (parseInt(item.id) === parseInt(goodsinfo.id)) {
          item.selected = goodsinfo.selected
        }
      })
      setItem('car', state.car)
    },
    // 根据id删除商品
    removeShopcart (state, id) {
      state.car.some((item, index) => {
        if (parseInt(item.id) === parseInt(id)) {
          state.car.splice(index, 1)
          return true
        }
      })
      setItem('car', state.car)
    },
    // 将购物车中选中的商品添加到buy数组中
    setBuy (state, goods) {
      state.buy = []
      if (goods) {
        // 如果传参有goods，说明是直接接购买。是将要购买的那一个商品加到buy数组中
        state.buy.push(goods)
      } else {
        // 将购物车中的商品添加到buy数组
        state.car.forEach(item => {
          if (item.selected) {
            state.buy.push(item)
          }
        })
      }
      setItem('buy', state.buy)
    }
  },
  actions: {},
  // getters是store的计算属性
  getters: {
    // 获取商品数量
    getGoodsCount (state) {
      // goods:[ 701: true, 888: 3 ]
      var goods = {}
      state.car.forEach(item => {
        goods[item.id] = item.count
      })
      return goods
    },
    // 获取商品有没有选中的状态值（selected）
    getGoodsSelected (state) {
      // goods:[ 701: true, 888: false ]
      var goods = {}
      state.car.forEach(item => {
        goods[item.id] = item.selected
      })
      return goods
    },
    // 获取选中的商品的件数
    getSelectedCount (state) {
      var count = 0
      state.car.forEach(item => {
        if (item.selected) {
          count += item.count
        }
      })
      return count
    },
    // 获取选中的商品
    getSelectedGoods (state) {
      var goods = {}
      state.car.forEach(item => {
        if (item.selected) {
          goods[item.id] = item
        }
      })
      return goods
    },
    // 获取要购买的商品
    getBuy (state) {
      var goods = {}
      state.buy.forEach(item => {
        goods[item.id] = item
      })
      return goods
    }
  },
  namespaced: true
}
