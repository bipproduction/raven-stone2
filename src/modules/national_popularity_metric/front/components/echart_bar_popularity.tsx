import { Box } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';

export default function EchartBarPopularity() {
  const [options, setOptions] = useState<EChartsOption>({});

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      legend: {
        textStyle: {
          color: "white",
        },
        show: true,
        right: "0%",
        top: "25%",
        orient: "vertical",
      },
      series: [
        {
          labelLine: {
            show: false,
          },

          label: {
            position: "inner",
            formatter: (a) => {
              return `${a.value + "%"}`;
            },
          },
          name: 'Access From',
          type: 'pie',
          radius: '100%',
          data: [
            { value: 1048, name: 'Confidence' },
            { value: 735, name: 'Supportive' },
            { value: 580, name: 'Positive' },
            { value: 484, name: 'Undecided' },
            { value: 300, name: 'Unsupportive' },
            { value: 300, name: 'Uncomfortable' },
            { value: 300, name: 'Negative' },
            { value: 300, name: 'Disapproval' },
          ],
          width: "68%",
          right: "80%",
          left: "0%",
          height: "100%",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

        }
      ]
    }
    setOptions(option);
  }
  return (
    <>
      <Box>
        <EChartsReact style={{
          height: 400,
          width: 400,
        }} option={options} />
      </Box>
    </>
  );
}
