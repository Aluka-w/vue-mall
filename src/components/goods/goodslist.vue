<template>

<div>
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="#/" class="router-link-active">首页</a> &gt;
            <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
        </div>
    </div>
    <div class="section">
        <div class="wrapper">
            <div class="wrap-box">
                <div class="left-220" style="margin: 0px;">
                    <!-- 左边商品列表 -->
                    <div class="banner-nav">
                        <ul>
                            <li v-for='item in goodsData.catelist' :key="item.id">
                                <h3>
                                    <i class="iconfont icon-arrow-right"></i>
                                    <span>{{item.title}}</span>
                                    <p>
                                        <span v-for='subitem in item.subcates' :key="subitem.id">
                                            {{subitem.title}}&nbsp;
                                        </span>
                                    </p>
                                </h3>
                                <div class="item-box" >
                                    <dl>
                                        <dt>
                                            <a href="/goods/40.html">{{item.title}}</a>
                                        </dt>
                                        <dd>
                                            <a href="/goods/43.html" v-for='subitem in item.subcates' :key="subitem.id">{{subitem.title}}</a>
                                        </dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 左边商品列表 -->
                </div>
                <!--幻灯片-->
                <div class="left-705">
                    <el-carousel :interval="5000" arrow="always">
                        <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                        <img :src="item.img_url" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!--/幻灯片-->
                <div class="left-220">
                    <ul class="side-img-list">
                        <li v-for='(item,index) in goodsData.toplist' :key="index">
                            <div class="img-box">
                                <label>{{index + 1}}</label>
                                <img :src="item.img_url">
                            </div>
                            <div class="txt-box">
                                <a href="/goods/show-98.html">{{item.title}}</a>
                                <span>{{item.add_time | dataFmt}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="section" v-for='item in goodsgroup' :key="item.level1cateid">
        <div class="main-tit">
            <h2>{{item.catetitle}}</h2>
            <p>
                <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">{{subitem.subcatetitle}}</a>
                <a href="/goods/40.html">更多
                    <i>+</i>
                </a>
            </p>
        </div>
        <div class="wrapper clearfix">
            <div class="wrap-box">
                <ul class="img-list">
                    <li v-for='lastitem in item.datas' :key="lastitem.artID">
                        <router-link :to="'/site/goodsinfo/'+lastitem.artID" class="">
                            <div class="img-box">
                                <img v-lazy="lastitem.img_url">
                            </div>
                            <div class="info">
                                <h3>{{lastitem.artTitle}}</h3>
                                <p class="price">
                                    <b>{{lastitem.sell_price}}</b>元</p>
                                <p>
                                    <strong>库存 {{lastitem.stock_quantity}}</strong>
                                    <span>市场价：
                                        <s>{{lastitem.market_price}}</s>
                                    </span>
                                </p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

</template>


<style>
   .el-carousel__container{
        height: 341px;
    }

    .el-carousel__item img {
        width: 100%;
        height: 100%;
    }
</style>





<script>
export default {
    // 数据
  data(){
      return {
          goodsData:{},//上边
          goodsgroup:[]//下边
      }
  },
    // 生命周期钩子函数,在组件创建之前就调用
  created(){
      this.getGoodsList()
      this.getgoodsgroup()
  },
  methods:{
       //获取商品数据
      getGoodsList(){
          const url = 'site/goods/gettopdata/goods'
          this.$axios.get(url).then(response=>{
              this.goodsData = response.data.message
            //   console.log(this.goodsData)
          })
      },
      getgoodsgroup(){
          const url = 'site/goods/getgoodsgroup'
          this.$axios.get(url).then(response=>{
              this.goodsgroup = response.data.message
            //   console.log(this.goodsgroup);
          })
      }
  }

}
</script>
