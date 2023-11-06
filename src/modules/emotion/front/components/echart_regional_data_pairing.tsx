import { Box, Group, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';

const provinsi = [
  {
    id: 1,
    name: 'ACEH',
  },
  {
    id: 2,
    name: 'BALI',
  },
  {
    id: 3,
    name: 'JAWA TIMUR',
  },
  {
    id: 4,
    name: 'JAWA TENGAH',
  },
  {
    id: 5,
    name: 'JAWA BARAT',
  },

]

export default function EchartRegionalDataPairing() {
  const [options, setOptions] = useState<EChartsOption>({});

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
      xAxis: [
        {
          type: 'category',
          data: ['Confidence', 'Supportive', 'Positive', 'Undecided', 'Unsupportive', 'Uncomfortable', 'Negative', 'Disapproval'],
          axisLabel: {
            rotate: 45,
            color: "white",
            fontSize: 10
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            show: true,
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: "white",
            formatter: (a: any) => {
              return `${a} %`;
            },
          },
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '70%',
          data: [
            {
              value: 30,
              itemStyle: {
                color: '#026D00'
              }
            },
            {
              value: 33,
              itemStyle: {
                color: '#62A334'
              }
            },
            {
              value: 67,
              itemStyle: {
                color: '#62C63F'
              }
            },
            {
              value: 29,
              itemStyle: {
                color: '#8EE886'
              }
            },
            {
              value: 57,
              itemStyle: {
                color: '#ED8C8C'
              }
            },
            {
              value: 87,
              itemStyle: {
                color: '#D13232'
              }
            },
            {
              value: 10,
              itemStyle: {
                color: '#DD0202'
              }
            },
            {
              value: 40,
              itemStyle: {
                color: '#790000'
              }
            },

          ],
        }
      ]
    };
    setOptions(option);
  }
  return (
    <>
    {provinsi.map((item) => {
      return(
      <Box key={item.id}>
        <Box>
        <Text c={"white"} fw={"bold"} fz={30}>{item.name}</Text>
        </Box>
        <Group justify='flex-end' >
          <Text c={"white"} fw={'bold'}>SENTIMENT ANALYSIS</Text>
        </Group>
        <Box pb={20}>
        <EChartsReact style={{ width: "100%" }} option={options} />
        </Box>
      </Box>
      )
    })}
    </>
  );
}
