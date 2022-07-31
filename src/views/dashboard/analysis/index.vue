<template>
  <div class="p-4">
    <!-- <GrowCard :loading="loading" class="enter-y" /> -->
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <!-- <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div> -->
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitSource from './components/VisitSource.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  // const electron = require('electron');
  // const ipc = electron.ipcRenderer;

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
    //執行方法
    // electron.ipcRenderer.send('a', '渲染進程給主進程發送數據啦~');
    //獲取主進程返回的數據
    // ipc.on('b', (e, data) => {
    //   console.log('获取主进程返回的数据', data);
    // });
  }, 1500);
</script>
