<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                          <!-- 放大镜 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsData.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!-- 放大镜 -->
                            <div class="goods-spec" v-if='goodsData.goodsinfo'>
                                <h1>{{goodsData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small" :min='1' :max="goodsData.goodsinfo.stock_quantity" v-model="count"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click='addToCar' class="add" ref="addToCarRef">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- iview 图钉-->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" :class="goodsToggle ? 'selected':''" @click='switchGoodsToggle(true)'>商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" :class="!goodsToggle ? 'selected':''" @click='switchGoodsToggle(false)'>商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- iview 图钉-->
                            <div class="tab-content entry" v-show='goodsToggle' style="display: block;" v-if='goodsData.goodsinfo'>
                                <span v-html="goodsData.goodsinfo.content"></span>
                            </div>
                            <div class="tab-content" v-show='!goodsToggle' style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" ref="commontTxt" name="txtContent" sucmsg=" " datatype="*10-1000" placeholder="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" @click='postCommont' value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentData.totalcount <= 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentData.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dataFmt('YYYY-MM-DD hh:mm')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="pageIndex"
                                        :page-sizes="[1, 2, 10, 20]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="commentData.totalcount  ">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in goodsData.hotgoodslist' :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dataFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 未填写评论,弹出消息框 -->
            <el-button :plain="true" @click="postCommont">警告</el-button>
            <!-- 点击添加购物车,动画相关 -->
        </div>
        <transition v-on:before-enter="beforeEnter"  v-on:enter="enter"  v-on:after-enter="afterEnter">
            <div v-show='isShowGoods' id="imgId" v-if='goodsData.imglist' ref="imgRef">
                <img :src="goodsData.imglist[0].thumb_path" alt="" >
            </div>
        </transition>
  </div>
</template>


<style scoped>
/* 局部引入样式 */
  @import url('../../statics/site/js/jqueryplugins/jqimgzoom/css/magnifier.css');

  /* 动画相关的样式 */
  #imgId{
      width: 50px;
      height: 50px;
      position: absolute;
      transition: all 0.5s;
  }
  #imgId img{
      width: 100%;
      height: 100%;
      
  }
</style>

<script>
// 导入放大镜的js
import "../../statics/site/js/jqueryplugins/jqimgzoom/js/magnifier.js"
import { Affix } from 'iview';


export default {
  data(){
    return {
      goodsData:[],//上半部分数据
      goodsToggle:true,//切换显示商品介绍和商品评论
      num6:1,
      commentData:{},//获取评论数据
      pageIndex:1,//当前评论的页码
      pageSize: 2,//评论页容量
      count:1,//商品数量
      addToCarRefOffset : null,//加入购物车按钮
      buyCarRefOffset: null,//购物车结束位置
      isShowGoods: false,//一开始加入购物车的动画缩略图
    }
  },
    //监听路由变化.然后跳转
    watch:{
        '$route':function(newvalue,old){
            // 监听到路由有变化,只需要把它再调用一遍就可以了
            this.getGoodsData()
            this.getComment()
        }
    },

  components:{
     Affix:Affix 
  },
  // 在构造组件开始的时候,调用一下
  created(){
    this.getGoodsData()
    this.getComment()
  },
  //在所有dom元素构建完成之后获取购物车的起始位置和结束位置
  mounted(){
      setTimeout(() => {
          this.addToCarRefOffset = $(this.$refs.addToCarRef).offset()

          $('#imgId').css('left',this.addToCarRefOffset.left + 'px').css('top',this.addToCarRefOffset.top + 'px')

          this.buyCarRefOffset = $('#buyCarRef').offset()
      }, 500);
  },
  methods:{
    //获取商品详情,上边
    getGoodsData(){
        const url = `site/goods/getgoodsinfo/${this.$route.params.goodsid}`
        this.$axios.get(url).then(response=>{
            this.goodsData = response.data.message
            // console.log(this.goodsData);
             setTimeout(() => {
                $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
            }, 200);
        })
    },

    //获取商品评论,下边
    getComment(){
      const url = `site/comment/getbypage/goods/${this.$route.params.goodsid}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$axios.get(url).then(response=>{
            this.commentData = response.data
      })
    },

    // 切换显示商品介绍和商品评论
    switchGoodsToggle(isShow){
      this.goodsToggle = isShow
    },

    // 分页的组件
    // 页容量改变
    handleSizeChange(val){
        this.pageSize = val
        this.getComment()
    },
    // 当前页改变
    handleCurrentChange(val){
        this.pageIndex = val
        this.getComment()
    },

    // 提交评论
    postCommont(){
        const url = `site/validate/comment/post/goods/${this.$route.params.goodsid}`
        const commontTxt = this.$refs.commontTxt.value
        // 当填写内容为空时
        if(commontTxt.trim().length <= 0){
            this.$message({
            showClose: true,
            message: '内容不能为空',
            type: 'warning'
            });
            return 
        }


        this.$axios.post(url,{'commenttxt':commontTxt}).then(response=>{
            if (response.data.status == 1) {
                    this.$message.error(response.data.message);
                    return
                }
            //代表成功,清空输入框
            this.$refs.commontTxt.value = ''
            //重新加载第一页数据
            this.pageIndex = 1
            this.getComment()

        })
    },

    //添加购物车动画
    addToCar(){
        this.isShowGoods = true
        // console.log(this.addToCarRefOffset);
        // console.log(this.buyCarRefOffset);
        const goodsObj={goodsId:this.$route.params.goodsid,count:this.count}
        this.$store.commit('addGoods',goodsObj)
    },
    // 动画相关
    beforeEnter: function (el) {
    // ...
        el.style.left = `${this.addToCarRefOffset.left}px`
        el.style.top = `${this.addToCarRefOffset.top}px`
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function (el, done) {
        // ...
        el.offsetWidth
         el.style.left = `${this.buyCarRefOffset.left}px`
         el.style.top = `${this.buyCarRefOffset.top}px`
        done()
    },
    afterEnter: function (el) {
        // ...
        this.isShowGoods = false
    },



  }
}
</script>
