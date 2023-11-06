import { Box, Group, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';

export default function EchartPublicRegionalInsights() {
  const [options, setOptions] = useState<EChartsOption>({});

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      yAxis: [
        {
          type: "category",
          data: ['Education', 'Health Services',  'Infrastructure', 'Poverty',  'Social Justice','Jobs'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            color: "white",
            fontSize: "12",
            fontWeight: "bold",
            // formatter: function (params: any) {
            //   return _.startCase(params);
            // },
          },
        },
      ],
      xAxis: [
        {
          type: "value",

          axisLabel: {
            color:"white",
            rotate: 25,
          },
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [
            {
              value: 13330,
              itemStyle: {
                color: '#026D00'
              }
            },
            {
              value: 21333,
              itemStyle: {
                color: '#62A334'
              }
            },
            {
              value: 11167,
              itemStyle: {
                color: '#62C63F'
              }
            },
            {
              value: 21989,
              itemStyle: {
                color: '#790000'
              }
            },
            {
              value: 52337,
              itemStyle: {
                color: '#ED8C8C'
              }
            },
            {
              value: 31817,
              itemStyle: {
                color: '#D13232'
              }
            },

            {
              value: 11240,
              itemStyle: {
                color: '#790000'
              }
            },

          ],
        },
      ],
    };
    setOptions(option);
  }
  return (
    <>
      <Box>
        <Group >
          <Text c={"white"} fw={'bold'}>PUBLIC CONCERNS TRENDS</Text>
        </Group>
        <EChartsReact style={{width: "100%" }} option={options} />
      </Box>
    </>
  );
}

