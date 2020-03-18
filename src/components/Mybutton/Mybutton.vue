<template>
<div class="btn" @click="handleLogin">
    {{data}}
    <slot name="text"></slot>
</div>

</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    handleLogin () {
      this.$emit('Login', '点我登录页面')
    }
  }
}
</script>

<style lang="less" scoped>
.btn{
    background-color: gold;
    color: white;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}

</style>
