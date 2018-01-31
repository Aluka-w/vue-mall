<template>
  <div>
      <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/cart.html">购物车</a>
        </div>
    </div>

    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2>
                        <i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                    <span>1</span>
                                    放进购物车
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span>2</span>
                                    填写订单信息
                                </div>
                            </li>
                            <li class="last">
                                <div class="progress">
                                    <span>3</span>
                                    支付/确认订单
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->
                <!--商品列表-->
                <div class="cart-box">
                    <input id="jsondata" name="jsondata" type="hidden">
                    <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                        <tbody>
                            <tr>
                                <th width="48" align="center">
                                    <a>选择</a>
                                </th>
                                <th align="left" colspan="2">商品信息</th>
                                <th width="84" align="left">单价</th>
                                <th width="104" align="center">数量</th>
                                <th width="104" align="left">金额(元)</th>
                                <th width="54" align="center">操作</th>
                            </tr>
                            <tr v-for="(item,index) in goodsList" :key="item.id">
                                <td width="48" align="center">
                                    <el-switch
                                        v-model="item.isSelected"
                                        active-color="#0094ff"
                                        inactive-color="#333333">
                                    </el-switch>
                                </td>
                                <td align="left" colspan="2">
                                    <img :src="item.img_url" alt="" width='50px' height='50px'>
                                    <span>{{ item.title}}</span>
                                </td>
                                <td width="84" align="left">{{item.sell_price}}</td>
                                <td width="104" align="center">
                                    <inputnumber @numberChange='getChangedNumber' :initCount='item.buycount' :goodsId='item.id'></inputnumber>
                                </td>
                                <td width="104" align="left">{{item.sell_price * item.buycount}}(元)</td>
                                <td width="54" align="center">
                                    <!-- <a href="javascript:;" @click='deleteGoods(item.id,index)'>删除</a> -->
                                    <el-button type="text" @click="deleteGoods">删除</el-button>
                                </td>
                            </tr>
                            <tr v-if='goodsList.length <= 0'>
                                <td colspan="10">
                                    <div class="msg-tips">
                                        <div class="icon warning">
                                            <i class="iconfont icon-tip"></i>
                                        </div>
                                        <div class="info">
                                            <strong>购物车没有商品！</strong>
                                            <p>您的购物车为空，
                                                <a href="/index.html">马上去购物</a>吧！</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th align="right" colspan="8">
                                    已选择商品
                                    <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                    <span class="red">￥</span>
                                    <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--/商品列表-->
                <!--购物车底部-->
                <div class="cart-foot clearfix">
                    <div class="right-box">
                        <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                        <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                    </div>
                </div>
                <!--购物车底部-->
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
// 导入封装的本地数据存储的组件,拿到购物车商品
import {getLocalGoods} from '../../common/localStorageTool.js'
// 详情页加商品
import goodslistVue from '../goods/goodslist.vue';
// 子组件
import inputnumber from '../subcomponents/inputnumber.vue'

export default {
  data(){
      return {
          goodsList:[],
      }
  },
  created(){
      this.getGoodsListData()
  },
//   注册子组件
  components:{
      inputnumber
  },
  computed:{
    // 获取商品总数量
      getTotalCount(){
          let totalCount = 0
          this.goodsList.forEach(item=>{
              if(item.isSelected){
                  totalCount += item.buycount
              }
          })
          return totalCount
      },
    // 获取商品总价格
    getTotalPrice(){
        let totalPrice = 0
        this.goodsList.forEach(item=>{
            if(item.isSelected){
            totalPrice += item.sell_price * item.buycount
            }
        })
        return totalPrice
    }
  },
  methods:{
    //  获取购物车商品
    getGoodsListData(){
        const localObj = getLocalGoods()
        // console.log(localObj)
       
        let tempArr = []
        for (const key in localObj) {
            tempArr.push(key)            
        }
        // console.log(tempArr);
        if(tempArr.length<=0) return
       const url = `site/comment/getshopcargoods/${tempArr.join(',')}`
    //    console.log(url)
       this.$axios.get(url).then(response=>{
           response.data.message.forEach(item => {
               item.buycount = localObj[item.id]
               item.isSelected = true
           });
           this.goodsList  = response.data.message
           console.log(this.goodsList)
       }) 
    },
    // 通过自定义事件,接受子组件传过来的值
    getChangedNumber(changedGoods){
        // 1.0重新计算商品的数量,这个是达到立马就计算属性触发计算
        this.goodsList.forEach(item=>{
            if(item.id == changedGoods.goodsId){
                item.buycount = changedGoods.count
            }
        })
        // 调用vuex中的mutation,达到对vuex的store的增删改操作,这个是存储在库中
        this.$store.commit('updateGoods',changedGoods)
    },
    // 删除商品
    deleteGoods(goodsId,index){
        
        // element-ui的确认删除框
        this.$confirm('是否删除本商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.goodsList.splice(index,1)
        this.$store.commit('deleteGoods',goodsId)
        this.$message({
            type: 'success',
            message: '删除成功!'

        })}).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }

  }
}
</script>
