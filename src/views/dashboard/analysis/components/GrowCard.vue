<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>
        <Input v-model:value="state.val1" class="mr-4 w-12" />
        ----
        <Input v-model:value="state.val2" class="mr-4 w-12" />
        <a-button @click="calcu('+')">+</a-button>
        <a-button @click="calcu('-')">-</a-button>
        <a-button @click="calcu('*')">*</a-button>
        <a-button @click="calcu('/')">/</a-button>
        <div>结果：{{ state.result }}</div>
        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo prefix="$" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="$" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card, Input } from 'ant-design-vue';
  import { growCardList } from '../data';
  import { getCurrentInstance, reactive } from 'vue';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const state = reactive({
    result: 0,
    val1: 0,
    val2: 0,
  });
  const currentInstance = getCurrentInstance();
  const { $hello } = currentInstance && currentInstance.appContext.config.globalProperties;
  // console.log('hell111', $hello._devide(3, 2));
  const calcu = (temp) => {
    const tempList = {
      '+': '_add',
      '-': '_subtract',
      '*': '_multiply',
      '/': '_devide',
    };
    state.result = $hello[tempList[temp]](state.val1, state.val2);
  };
</script>
