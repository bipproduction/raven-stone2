import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import React, { useState } from 'react';
import * as echarts from 'echarts';
import { Box, Button, Divider, Group } from '@mantine/core';
import EChartsReact from 'echarts-for-react';

/**
 * Fungsi untuk menampilkan echart popularity.
 * @returns Untuk menampilkan echart popularity
 */
export default function EchartPopularity() {
  const [options, setOptions] = useState<EChartsOption>({});

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      xAxis: [
        {
          type: 'category',
          data: ['2023-10-16', '2023-10-17', '2023-10-18', "2023-10-19", "2023-10-20", "2023-10-21", "2023-10-22", "2023-10-23"],
          boundaryGap: false,
          axisLabel: {
            verticalAlign: "middle",
            rotate: 25,
            color: "white"
          },
        },

      ],
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (a: any) => {
            return `${a} %`;
          },
          color: "white"
        },
        
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          data: [40, 50, 40, 66, 83, 52, 33, 22],
          type: 'line',
          color: "#ad001e",
          showSymbol: false,
          areaStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
              {
                offset: 0,
                color: 'rgb(35,13,55)'
              },
              {
                offset: 1,
                color: 'rgba(124,3,13,1)'
              }
            ])
          },

        }
      ]
    }
    setOptions(option);
  }



  return (
    <>
      <Box
      // style={{
      //   backgroundColor: "#000000",
      //   borderRadius: 10,
      //   padding: 10
      // }}
      >
        <Group justify='flex-end' mr={30}>
          <Group>
            <Button variant='subtle' c={"white"}>Month</Button>
            <Divider orientation="vertical" />
            <Button variant='subtle' c={"white"}>Week</Button>
            <Divider orientation="vertical" />
            <Button variant='subtle' c={"white"}>Custom</Button>
          </Group>
        </Group>
        <EChartsReact style={{ width: "100%" }} option={options} />
      </Box>
    </>
  )
}
