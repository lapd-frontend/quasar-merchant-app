<template>
  <q-page class="bgss">
<!--    <div class="welcome fullscreen" v-if="sec!==0">-->

<!--    </div>-->
    <div class="q-pa-lg">
      <h3 class="login-tit">登陆</h3>
      <div class="q-gutter-md">
        <q-input color="primary"
          placeholder="请输入手机号"
          ref="input"
          dens
          v-model.trim="form.username"
          :rules="[
            val => !!val || '请输入账号',
            // val => val.length == 11 || '请输入11位手机号',
            // val => (/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(val)) || '请输入正确的手机号'
          ]"
          lazy-rules
        >
          <!-- <template v-slot:prepend>
            <q-icon name="person" />
          </template> -->
          <template v-slot:append v-if="form.username !== ''">
            <q-icon name="close" @click="form.username = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <q-input color="primary"
          placeholder="请输入密码"
          type="password"
          ref="input"
          dens
          v-model.trim="form.password"
          :rules="[
            val => !!val || '请输入密码',
            val => (/^[a-zA-Z0-9]{6,18}$/.test(val)) || '请输入6-18位密码'
          ]"
          lazy-rules
        >
          <!-- <template v-slot:prepend>
            <q-icon name="work" />
          </template> -->
          <template v-slot:append v-if="form.password !== ''">
            <q-icon name="close" @click="form.password = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <div class="q-pa-xs">
          <q-btn color="primary" class="full-width custom-login-btn" :disable="loginbtn" @click="submitCheck" label="登陆" :loading="btnLoading"></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
  import {notify} from 'src/utils/popups'
  // import {loginSubmit} from 'src/api/login'
  // import { mapState } from 'vuex'
  import urls from 'src/api/urls'
  import {setSession,getSession} from 'src/utils/getToken'
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        sec: 0,
        loginbtn:false,
        btnLoading: false,
        form:{
          username: '',
          password: ''
        }
      }
    },
    created () {
      let token = this.$q.localStorage.getItem('token')
      let user = this.$q.localStorage.getItem('userInfo') || ''
      let vm = this
      if(user){
        vm.tolinks(user.roleCode)
      } else {
        // vm.sec = 3
        // let interval =setInterval(() => {
        //   if (vm.sec > 0) {
        //     vm.sec --
        //   } else {
        //     clearInterval(interval)
        //   }
        // }, 1000)
      }
    },
    methods: {
      reset () {
         this.$refs.input.resetValidation()
      },
      submitCheck(){
        let that = this
        if(this.form.username == ''){
          notify('请输入登录账号')
        }
        // else if(!(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(this.form.username))){
        //   notify('请输入正确手机号码')
        // }
        else if(this.form.password == ''){
          notify('请输入登录密码')
        } else if(!(/^[a-zA-Z0-9]{6,18}$/.test(this.form.password))){
          notify('请输入6-18位密码')
        }else{
          that.loginbtn = true
          that.submit()
        }
      },
      submit(){
        let that = this
        let data = {loginid:this.form.username,password:md5(this.form.password)}
        this.btnLoading = true
        that.$axios(urls.login, data).then(res=>{
          if(res.code == 'success'){
            setSession('islogin','login')
            setSession('user',res)
            this.$q.localStorage.set('userInfo', res)
            this.$q.localStorage.set('myAccount', data.loginid)
            that.$store.commit('user/setToken', res.token)
            if (res.roleCode === 'shop') {
              this.$q.localStorage.set('socketUrl', res.websocketUrl)
              this.$q.localStorage.set('currentShop', res.shopid)
            }
            that.tolinks(res.roleCode)
          } else {
            notify(res.msg)
          }
          that.btnLoading = false
          that.loginbtn = false
        }).catch(err=>{
          that.loginbtn = false
          console.log(err)
          that.btnLoading = false
        })
      },
      tolinks(link){
        this.$q.localStorage.set('currentRole', link)
        if(link === 'hq'){
          this.$q.localStorage.remove('currentShop') // 清除缓存中的shop
          this.$store.commit('common/setSearchOptions', 0)
          this.$store.commit('common/setCurrentRole', link)
          this.$router.push({path:'/index/companyindex', query: {'role': link}})
        }else if(link === 'cashier' || link === 'shop'){
          this.$store.commit('common/setSearchOptions', 'shop')
          this.$store.commit('common/setCurrentRole', link)
          this.$router.push({path:'/index/shopindex', query: {'role': 'shop'}})
        }
      }
    }
  }
</script>

<style scoped>
  h3{font-size: 20px;}
  .bgss{background-color: #fff;}
  .login-tit{
    margin-top: 12vh;
    font-size: 2.8rem;
  }
  .custom-login-btn{
    height: 4.5rem;
    font-size: 1.7rem;
    /*box-shadow: 4px 4px 10px -3px rgba(60, 136, 246, 0.5), 4px 4px 10px -3px rgba(60, 136, 246, 0.5), 4px 4px 10px -3px rgba(60, 136, 246, 0.5);*/
  }
  .welcome{
    background-image: url("../assets/B-indexBg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
