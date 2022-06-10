<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import { onMounted, reactive, getCurrentInstance } from 'vue';
  // import hello from './hello.js';

  import 'dayjs/locale/zh-cn';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  const currentInstance = getCurrentInstance();
  const { $hello } = currentInstance.appContext.config.globalProperties;

  console.log('hell', $hello._add(23, 3));

  // const data = reactive({
  //   helloModule: {},
  // });

  // const HelloPromise = hello({
  //   noInitialRun: true,
  //   noExitRuntime: true,
  // });

  // HelloPromise.then((mod) => {
  //   data.helloModule = mod;
  //   console.log('mod', mod, data.helloModule, data.helloModule._add(22, 3));
  // }).then(() => {
  //   add();
  // });

  // const add = () => {
  //   console.log('haha', data.helloModule._add(22, 3));
  // };

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
