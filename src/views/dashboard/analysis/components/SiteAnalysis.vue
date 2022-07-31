<template>
  <InputNumber
    size="large"
    v-model:value="aa1"
    :min="0"
    @change="changeWholeNum(aa1)"
    addon-before="曲线数量"
    addon-after="条"
  />

  <InputNumber
    size="large"
    v-model:value="aa2"
    :min="0"
    @change="changeTimeStep(aa2)"
    step="20"
    addon-before="时间梯度"
    addon-after="ms"
  />
  <Button @click="bingoStop()">pause</Button>

  <!-- <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  > -->
  <Card>
    <p v-if="activeKey === 'tab1' && bingo">
      <VisitAnalysis ref="getChildList" :wholeNum="aa" :timeStep="bb" />
    </p>
    <!-- <p v-if="activeKey === 'tab2'">
      <VisitAnalysisBar />
    </p> -->
  </Card>
</template>
<script lang="ts" setup>
  import { InputNumber, Button } from 'ant-design-vue';

  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import VisitAnalysis from './VisitAnalysis.vue';
  // import VisitAnalysisBar from './VisitAnalysisBar.vue';

  const getChildList = ref(null);
  const activeKey = ref('tab1');
  const aa = ref(0);
  const bb = ref(1000);
  const aa1 = ref(0);
  const aa2 = ref(1000);
  const bingo = ref(true);
  const bingoStop: () => void = () => {
    getChildList.value?.bingoStop();
  };
  const changeWholeNum = async (num) => {
    console.log('num', num);
    aa.value = +num;
    bingo.value = await false;
    bingo.value = await true;
  };
  const changeTimeStep = async (num) => {
    console.log('num', num);
    bb.value = +num;
    bingo.value = await false;
    bingo.value = await true;
  };
  const tabListTitle = [
    {
      key: 'tab1',
      tab: '性能测试',
    },
    // {
    //   key: 'tab2',
    //   tab: '访问量',
    // },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>
