<template>
  <div class="page">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <div class="input-box">
              <input id="txtUserName" name="txtUserName" type="text" ref="userNameRef" placeholder="用户名/手机/邮箱" maxlength="50">
            </div>
            <div class="input-box">
              <input id="txtPassword" name="txtPassword" type="password" ref="paswordRef" placeholder="输入登录密码" maxlength="16">
            </div>
            <div class="btn-box">
              <input id="btnSubmit" name="btnSubmit" type="submit" @click="submit" value="立即登录">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script >
// 默认全部导出
import bus from '../../common/common'
// 按需导出
import {ISLOGIN} from '../../common/common'
export default {
  data() {
    return {

    };
  },
  components: {

  },
  methods:{
    submit(){
      const url ='site/account/login'
      const params = {user_name:this.$refs.userNameRef.value,password:this.$refs.paswordRef.value}
      this.$axios.post(url,params).then(response=>{
        if(response.data.status==1){
          this.$message.error(response.data.message)
        }else{
          bus.$emit(ISLOGIN,true)
          this.$router.push({path:`${localStorage.getItem('lastPath')}`})
        }
      })
    }
  }
};
</script>

