<template>
  <div>
      <div class='left' @click='reduce'>-</div>
      <div class='middle' >{{count}}</div>
      <div class='right' @click='add'>+</div>
  </div>
</template>

<style scoped>
       .left,.middle,.right{
       display: inline-block;
       width: 30px;
       height: 30px;
       line-height: 30px;
       text-align: center;
       border:1px solid rgba(92,92,92,0.3);
   }
</style>


<script>
export default {
  data(){
      return {
          count:1
      }
  },
  //子组件通过props声明要接受的父组件的值
  props:['initCount','goodsId'],
  created(){
      this.count = this.initCount
  },
  methods:{
      reduce(){
          if(this.count<=0){
              return
          }
          this.count--
          this.notify()
      },
      add(){
          this.count++
          this.notify()
      },
      notify(){
        //   子组件,通过触发自定义事件,把商品id和数量传给父组件
        this.$emit('numberChange',{goodsId:this.goodsId,count:this.count})
      }
  }
}
</script>


