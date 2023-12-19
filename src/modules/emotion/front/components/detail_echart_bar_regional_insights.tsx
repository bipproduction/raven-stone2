import { COLOR_EMOTION } from '@/modules/_global';
import { Box, Group, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import _ from 'lodash';
import React, { useState } from 'react';


/**
 * Fungsi untuk menampilkan detail echart regional insights.
 * @param {dataEmotion} dataEmotion - menampilkan dataEmotion.
 * @returns Untuk  menampilkan detail echart regional insights
 */
export default function DetailEchartBarRegionalInsights({ dataEmotion }: { dataEmotion: any }) {
  const [options, setOptions] = useState<EChartsOption>({})
  const [dataChart, setDataChart] = useState<any>({
    confidence: Number(dataEmotion.confidence),
    supportive: Number(dataEmotion.supportive),
    positive: Number(dataEmotion.positive),
    undecided: Number(dataEmotion.undecided),
    unsupportive: Number(dataEmotion.unsupportive),
    uncomfortable: Number(dataEmotion.uncomfortable),
    negative: Number(dataEmotion.negative),
    dissapproval: Number(dataEmotion.dissapproval),
  })

  useShallowEffect(() => {
    loadData()
  }, [])
  const loadData = () => {
    const option: EChartsOption = {
      title: {
        text: "SENTIMENT ANALYSIS",
        textStyle: {
          color: "white",
          fontSize: 15
        }
      },
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
      <Box pt={20}>
        <EChartsReact style={{ width: "100%" }} option={options} />
      </Box>
    </>
  );
}


