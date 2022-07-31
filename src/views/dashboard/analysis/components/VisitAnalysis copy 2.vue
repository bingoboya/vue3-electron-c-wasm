<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props';
</script>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  // import echarts from '/@/utils/lib/echarts';
  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  onMounted(() => {
    setOptions({
      animationDuration: 10000,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      // xAxis: {
      //   type: 'category',
      //   boundaryGap: false,
      //   data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
      //   splitLine: {
      //     show: true,
      //     lineStyle: {
      //       width: 1,
      //       type: 'solid',
      //       color: 'rgba(226,226,226,0.5)',
      //     },
      //   },
      //   axisTick: {
      //     show: false,
      //   },
      // },
      // yAxis: [
      //   {
      //     type: 'value',
      //     // max: 80000,
      //     // splitNumber: 4,
      //     // axisTick: {
      //     //   show: false,
      //     // },
      //     // splitArea: {
      //     //   show: true,
      //     //   areaStyle: {
      //     //     color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
      //     //   },
      //     // },
      //   },
      // ],
      xAxis: {
        name: 'x',
        minorTick: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
      },
      yAxis: [
        {
          type: 'value',
        },
        // {
        //   type: 'value',
        // },
      ],
      grid: {
        top: 40,
        left: 50,
        right: 40,
        bottom: 50,
      },
      // grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      series: [
        {
          type: 'line',
          showSymbol: false,
          clip: true,
          data: generateData(),
        },
        // {
        //   type: 'line',
        //   showSymbol: false,
        //   clip: true,
        //   data: generateData(),
        // },
        // {
        //   smooth: true,
        //   data: [
        //     111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222,
        //     11111, 4000, 2000, 500, 333, 222, 111,
        //   ],
        //   type: 'line',
        //   // areaStyle: {},
        //   itemStyle: {
        //     color: '#5ab1ef',
        //   },
        // },
        // {
        //   smooth: true,
        //   data: generateData(),
        //   // data: [
        //   //   33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
        //   //   198, 60, 30, 22, 11,
        //   // ],
        //   type: 'line',
        //   // areaStyle: {},
        //   itemStyle: {
        //     color: '#019680',
        //   },
        // },
      ],
    });
  });

  const func = (x: number) => {
    x /= 10;
    return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50;
  };

  function generateData() {
    let data: any = [];
    for (let i = -200; i <= 200; i += 0.1) {
      data.push([i, func(i)]);
    }
    console.log(1, data);
    return data;
  }
  generateData();
</script>
