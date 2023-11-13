import { COLOR_EMOTION } from '@/modules/_global';
import { Box } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

export default function EchartBarPopularity({ emotion }: { emotion: any }) {
  const [options, setOptions] = useState<EChartsOption>({})

  useEffect(() => {
    loadData(emotion)
  }, [emotion])

  const loadData = (dataEmotion: any) => {
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
          data: Object.keys(dataEmotion ?? []).map(
            (v: any) =>
            ({
              name: v,
              value: dataEmotion[v],
              itemStyle: {
                color:
                  COLOR_EMOTION.find((v2) => _.lowerCase(v2.name) == v)
                    ?.color ?? "gray",
              },
            })
          ),
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
