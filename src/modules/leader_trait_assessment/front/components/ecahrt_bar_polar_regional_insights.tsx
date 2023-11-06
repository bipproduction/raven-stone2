import { Box, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';

export default function EcahrtBarPolarRegionalInsights() {
  const [options, setOptions] = useState<EChartsOption>({});

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      radiusAxis: {},
      polar: {},
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      angleAxis: {
        type: "category",
        data: ['Honest', 'Military Background', 'Religius', 'Achievement', 'Leading Experience', 'Smart', 'Firm', 'Hard Worker', 'Populist'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: "white",
          fontSize: "10",
        },
        startAngle: 60,
      },
      series: [
        {
          name: "Direct",
          type: "bar",
          coordinateSystem: "polar",
          barWidth: 80,
          data: [
            {
              value: 2323,
              itemStyle: {
                color: "#5F3E94"
              }
            },
            {
              value: 1223,
              itemStyle: {
                color: "#1EB0D8"
              }
            },
            {
              value: 3323,
              itemStyle: {
                color: "#145C8C"
              }
            },
            {
              value: 1323,
              itemStyle: {
                color: "#93C76C"
              }
            },
            {
              value: 2223,
              itemStyle: {
                color: "#C4E0B6"
              }
            },
            {
              value: 2623,
              itemStyle: {
                color: "#7C1617"
              }
            },
            {
              value: 1123,
              itemStyle: {
                color: "#F1B8B9"
              }
            },
            {
              value: 1923,
              itemStyle: {
                color: "#62AF40"
              }
            },
            {
              value: 3323,
              itemStyle: {
                color: "#7D2933"
              }
            },

          ],
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      ],
    };
    setOptions(option);
  }
  return (
    <>
      <Box>
        <Text ta={'center'} fz={16} c={"white"} fw={'bold'}>LEADER TRAIT ASSESSMENT
        </Text>
        <EChartsReact
          style={{
            width: "100%",
          }}
          option={options}
        />
      </Box>

    </>
  );
}
