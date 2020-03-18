<template>
  <div class="home">
    <div @click="handleclick" class="box">commit</div>
    <LoginBtn :data="btname" @Login="handleLogin">
      <span slot="text">
        <!-- 点击 -->
      </span>
    </LoginBtn>
    <div @click="changeAction" class="bigbox">dispatch</div>
    <!-- 路由嵌套 -->
    <router-link to="/home/welcome">嵌套路由</router-link>
    <router-view></router-view>
    <!-- 轮播图渲染 -->
    <div v-if="swpierList.length">
      <el-carousel :interval="1000" type="card" height="200px">
        <el-carousel-item v-for="(v,i) in swpierList" :key="i">
          <img :src="`http://157.122.54.189:9095${v.url}`" style="width:100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
// 引入子组件
import LoginBtn from '../components/Mybutton/Mybutton'
// 引进axios
import axios from '../utils/axios'
// 引进基准路径
// import { baseURL } from '../utils/axios'

export default {
  components: {
    LoginBtn
  },
  data () {
    return {
      btname: '登录',
      params: {
        name: '广州'
      },
      // 轮播图数据
      swpierList: []
    }
  },
  // mounted () {
  //   this.getswiperlist()

  // },
  watch: {
    swpierList () {
      // console.log('轮播图动起来');
      this.$message.success('轮播图动起来')
    }
  },
  methods: {
    // 处理vuex里面的数据
    handleclick () {
      // 拿到store里面的数据
      // console.log(this.$store.state.name);
      const newname = '李四'
      // 同步修改state里面的值
      this.$store.commit('changeName', newname)
      console.log(this.$store.state.name)
    },
    async handleLogin (val) {
      const res = await Promise.all([this.getCity(), this.getswiper()])
      // console.log(res[1].data.data);
      // 获取轮播图
      this.swpierList = res[1].data.data
      // console.log(this.swpierList);
    },
    getCity () {
      return axios.get('/cities', { params: this.params })
    },
    getswiper () {
      return axios.get('/scenics/banners')
    },
    getswiperlist () {
      axios.get('/scenics/banners').then(res => {
        this.swpierList = res.data.data
      })
    },
    // dispatch的用法
    changeAction () {
      this.$store.dispatch('sendName', 'dispatch数据')
      console.log(this.$store.state.name)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 400px;
  height: 600px;
  border: 1px red solid;
  margin: 0 auto;
  .box {
    background-color: red;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
  }
  .bigbox {
    background-color: green;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
  }
}
</style>
