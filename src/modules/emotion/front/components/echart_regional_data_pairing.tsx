import { COLOR_EMOTION } from '@/modules/_global';
import { Box, Group, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';
import _ from 'lodash';


/**
 * Fungsi untuk menampilkan echart regional data pairing.
 * @param {dataEmotion} dataEmotion - menampilkan dataEmotion.
 * @param {total} total - menampilkan total.
 * @returns Untuk  menampilkan echart regional data pairing
 */
export default function EchartRegionalDataPairing({ dataEmotion, total }: { dataEmotion: any, total: any }) {
  const [options, setOptions] = useState<EChartsOption>({});
  const [dataChart, setDataChart] = useState<any>({
    confidence: _.round((Number(dataEmotion.confidence) / total) * 100, 2),
    supportive: _.round((Number(dataEmotion.supportive) / total) * 100, 2),
    positive: _.round((Number(dataEmotion.positive) / total) * 100, 2),
    undecided: _.round((Number(dataEmotion.undecided) / total) * 100, 2),
    unsupportive: _.round((Number(dataEmotion.unsupportive) / total) * 100, 2),
    uncomfortable: _.round((Number(dataEmotion.uncomfortable) / total) * 100, 2),
    negative: _.round((Number(dataEmotion.negative) / total) * 100, 2),
    dissapproval: _.round((Number(dataEmotion.dissapproval) / total) * 100, 2),
  })



  useShallowEffect(() => {
    loadData()
  }, [])
  const loadData = () => {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (a: any) => {
          return `
          <i>${_.upperCase(a[0].data.name)}</i>
          <h1>${a[0].data.value} %</h1>
          `;
        },
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
              return `${a}%`;
            },
          },
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '70%',
          data: Object.keys(dataChart ?? []).map(
            (v: any) =>
            ({
              name: v,
              value: dataChart[v],
              itemStyle: {
                color:
                  COLOR_EMOTION.find((v2) => _.lowerCase(v2.name) == v)
                    ?.color ?? "gray",
              },
            })
          ),
        }
      ]
    };
    setOptions(option);
  }
  return (
    <>

      <Box>
        <Box>
          <Text c={"white"} fw={"bold"} fz={30}>{dataEmotion.name}</Text>
        </Box>
        <Group justify='flex-end' >
          <Text c={"white"} fw={'bold'}>SENTIMENT ANALYSIS</Text>
        </Group>
        <Box pb={10}>
          <EChartsReact style={{ width: "100%", height:420 }} option={options} />
        </Box>
      </Box>
    </>
  );
}
