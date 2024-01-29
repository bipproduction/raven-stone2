'use client'
import React, { useState } from 'react';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import { useShallowEffect } from '@mantine/hooks';
import { Box } from '@mantine/core';

export default function ChartPaslon2() {
  const [options, setOptions] = useState<EChartsOption>({})


  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: "value",
        show: false,
        axisLabel: {
          color: "white",
          rotate: 25,
        },
      },
      yAxis: {
        axisLine: { show: false },
        type: 'category',
        show: false,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: "white",
          fontSize: "12",
          fontWeight: "bold",
        },
        data: ['NEGATiVE', 'NEUTRAL', 'POSITIVE']
      },
      series: [
        {
          name: 'Paslon',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            fontSize: 16,
            formatter: (a) => {
              return `${a.value + "%"}`;
            },
          },
          emphasis: {
            focus: 'series',
          },
          data: [
            {
              value: 31.05,
              name: 'NEGATiVE',
              itemStyle: {
                color: "red",
                borderRadius: 30
              }
            },
            {
              value: 17.05,
              name: 'NEUTRAL',
              itemStyle: {
                color: "white",
                borderRadius: 30
              }
            },
            {
              value: 65.05,
              name: 'POSITIVE',
              itemStyle: {
                color: "green",
                borderRadius: 30
              }
            },

          ],
        },
      ]
    };
    setOptions(option);
  }

  return (
    <>
      <Box>
        <EChartsReact style={{ height: 300 }} option={options} />
      </Box>
    </>
  );
}
