<template>
  <Button @click="bingoStop()">pause</Button>
  <!--  <Button @click="bingoStart()">Start</Button> -->
  <div ref="chartRef11" :style="{ height: '380px', width: '100%' }"></div>
</template>
<!-- <script>
  // import { basicProps } from './props';
</script> -->
<script setup>
  import { Button } from 'ant-design-vue';

  import { onMounted, ref, reactive, watch, onUnmounted } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  // import echarts from '/@/utils/lib/echarts';
  // const basicProps = {
  //   width: {
  //     type: String,
  //     default: '100%',
  //   },
  //   height: {
  //     type: String,
  //     default: '280px',
  //   },
  // };
  // defineProps({
  // ...basicProps,
  // });
  const props = defineProps({
    wholeNum: {
      type: Number,
    },
    timeStep: {
      type: Number,
      default: 20,
    },
  });
  // watch(
  //   () => props.wholeNum,
  //   (n, o) => {
  //     console.log('dd', n, o);
  //   },
  // );
  const chartRef11 = ref(null);
  let timers;
  const { setOptions } = useECharts(chartRef11);

  const data = reactive({
    x_axis: [],
    x_data: 0,
    // y_axis1: [],
    // y_axis2: [],
    // y_axis3: [],
    angle: 0,
  });

  const arrList = [...new Array(props.wholeNum)];
  arrList.forEach((item, i) => {
    data[`y_axis${i + 1}`] = [];
  });
  function sin_data(x) {
    return Math.sin(x * Math.PI);
  }
  // 生成x轴和y轴数据
  function addData(shift) {
    data.x_axis.push(data.x_data++);
    const aa = arrList.map((_item, index) => `y_data${index + 1}`);
    aa.forEach((item, i) => {
      // console.log(1, item, 2 * i * sin_data(data.angle));
      data[`y_axis${i + 1}`] && data[`y_axis${i + 1}`].push(2 * (i + 1) * sin_data(data.angle));
    });

    // const y_data1 = 10 * sin_data(data.angle);
    // const y_data2 = 14 * sin_data(data.angle);
    // const y_data3 = 17 * sin_data(data.angle);
    // data.y_axis1.push(y_data1);
    // data.y_axis2.push(y_data2);
    // data.y_axis3.push(y_data3);
    data.angle += 0.1;

    if (shift) {
      // data.x_axis.shift();
      // aa.forEach((item, i) => {
      //   data[`y_axis${i + 1}`] && data[`y_axis${i + 1}`].shift();
      // });
      // data.y_axis1.shift();
      // data.y_axis2.shift();
      // data.y_axis3.shift();
    }
  }

  // 生成100个数据，初始化x_axis和y_axis1数组，数组的长度在这里被设置成100
  for (var i = 0; i < 100; i++) {
    addData(false);
  }

  const vv = arrList.map((_item, i) => {
    return {
      type: 'line',
      showSymbol: false,
      clip: true,
      data: data[`y_axis${i + 1}`],
    };
  });

  const option = {
    // animationDuration: 10000,
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
      type: 'category',
      data: data.x_axis,
      // minorTick: {
      //   show: true,
      // },
      // minorSplitLine: {
      //   show: true,
      // },
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
    dataZoom: [
      {
        type: 'inside',
        // start: 0,
        // end: 20,
      },
      {
        // start: 0,
        // end: 20,
      },
    ],
    // grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    series: vv,
    // series: [
    //   {
    //     type: 'line',
    //     showSymbol: false,
    //     clip: true,
    //     data: data.y_axis1,
    //     // data: generateData(),
    //   },
    //   {
    //     type: 'line',
    //     showSymbol: false,
    //     clip: true,
    //     data: data.y_axis2,
    //     // data: generateData(),
    //   },
    //   {
    //     type: 'line',
    //     showSymbol: false,
    //     clip: true,
    //     data: data.y_axis3,
    //     // data: generateData(),
    //   },
    // ],
  };
  onMounted(() => {
    setOptions(option);
  });
  watch(
    () => props.wholeNum,
    (n, o) => {
      console.log('wholeNum', n, o);
      if (!!n && n > 0) {
        timers = setInterval(function () {
          addData(true); // 生成数据并左移
          // console.log(data.x_axis);
          setOptions(option, false);
        }, props.timeStep); // 500ms刷新一次
      }
    },
    {
      immediate: true,
    },
  );

  watch(
    () => data.angle,
    () => {
      // console.log('angle', data.angle);
      if (data.angle > 20) {
        // clearInterval(timers);
      }
    },
  );
  const bingoStop = () => {
    clearInterval(timers);
    console.log('timers11', timers);
  };
  onUnmounted(() => {
    clearInterval(timers);
  });
  const bingoStart = () => {
    console.log('timers', timers);
    timers = setInterval(() => {
      addData(true); // 生成数据并左移
      // console.log(data.x_axis);
      setOptions(option, false);
    }, 300); // 500ms刷新一次
    console.log('timers2', timers);
  };
  // const func = (x) => {
  //   x /= 10;
  //   return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50;
  // };

  // function generateData() {
  //   let data = [];
  //   for (let i = -200; i <= 200; i += 0.1) {
  //     data.push([i, func(i)]);
  //   }
  //   console.log(1, data);
  //   return data;
  // }
  // generateData();
</script>
