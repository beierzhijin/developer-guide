<script setup lang='ts'>
interface img {
  imgUrl: string;
  title: string;
}

const imgs: Array<img> = [
  {
    imgUrl: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/Playmaker-logo.png',
    title: 'Playmaker'
  },
  {
    imgUrl: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/Expressionist-logo.png',
    title: 'Expressionist'
  },
  {
    imgUrl: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/Visionary-logo.png',
    title: 'Visionary'
  },
  {
    imgUrl: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/Activist-logo.png',
    title: 'Activist'
  },
  {
    imgUrl: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/Dreamer-logo.png',
    title: 'Dreamer'
  },
  {
    imgUrl: 'https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/Innovator-logo.png',
    title: 'Innovator'
  }
]
</script>
<template>
  <div class="outbox">
    <div v-for="(item, index) in imgs" :key="index">
      <img width="100" class="logo" style="margin-right: 20px;" :src="item.imgUrl" :title="item.title" alt="404">
    </div>
  </div>
</template>

<style lang='scss' scoped>
@media (max-width: 768px) {
  .logo {
    width: 50%;
  }
}


@media (max-width: 768px) {
  .logo {
    width: 50%;
  }
}

@media (min-width: 960px) {
  .outbox {
    display: flex;
  }
}
</style>
