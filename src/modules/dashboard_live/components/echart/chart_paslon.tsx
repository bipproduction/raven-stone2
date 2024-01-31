'use client'
import React, { useState } from 'react';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import { useShallowEffect } from '@mantine/hooks';
import { Box } from '@mantine/core';
import { Michroma } from 'next/font/google';
import _ from 'lodash';
export const roboto_mono = Michroma({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  style: ["normal"]
})
export default function ChartPaslon({ persen }: { persen: any }) {
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
        left: '5%',
        right: '-15%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: "value",
        max: 100,
        inverse: true,
        show: false,
        axisLabel: {
          color: "white",
          rotate: 25,
        },
      },
      yAxis: {
        position: "right",
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
        data: ['NEGATIVE', 'NEUTRAL', 'POSITIVE']
      },
      series: [
        {
          name: 'Paslon',
          type: 'bar',
          stack: 'total',
          label: {
            show: false,
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
              value: _.isNaN(persen.negative) ? 0 : persen.negative,
              name: 'NEGATIVE',
              itemStyle: {
                color: "red",
                borderRadius: 30
              }
            },
            {
              value: _.isNaN(persen.neutral) ? 0 : persen.neutral,
              name: 'NEUTRAL',
              itemStyle: {
                color: "white",
                borderRadius: 30
              }
            },
            {
              value: _.isNaN(persen.positive) ? 0 : persen.positive,
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
