'use client'
import { COLOR_EMOTION } from '@/modules/_global';
import { Box, Group, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import _ from 'lodash';
import React, { useState } from 'react';

/**
 * Fungsi untuk menampilkan echart bar regional insights.
 * @param {dataEmotion} dataEmotion - menampilkan dataEmotion.
 * @returns Untuk  menampilkan echart bar regional insights
 */

export default function EchartBarRegionalInsights({ dataEmotion }: { dataEmotion: any }) {
  const [options, setOptions] = useState<EChartsOption>({})
  const [dataChart, setDataChart] = useState<any>()

  useShallowEffect(() => {
    setDataChart(
      {
        confidence: Number(dataEmotion.confidence),
        supportive: Number(dataEmotion.supportive),
        positive: Number(dataEmotion.positive),
        undecided: Number(dataEmotion.undecided),
        unsupportive: Number(dataEmotion.unsupportive),
        uncomfortable: Number(dataEmotion.uncomfortable),
        negative: Number(dataEmotion.negative),
        dissapproval: Number(dataEmotion.dissapproval),
      }
    )
    loadData(dataChart)
  }, [dataEmotion, dataChart])


  const loadData = (dataLoad: any) => {
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
          },
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '70%',
          data: Object.keys(dataLoad ?? []).map(
            (v: any) =>
            ({
              name: v,
              value: dataLoad[v],
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
        <Group justify='flex-end'>
          <Text c={"white"} fw={'bold'}>SENTIMENT ANALYSIS</Text>
        </Group>
        <EChartsReact style={{ height: 550 }} option={options} />
      </Box>
    </>
  );
}
