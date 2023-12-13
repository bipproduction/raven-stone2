'use client'

import { COLOR_EMOTION } from '@/modules/_global';
import { Box, Group, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';

/**
 * Fungsi untuk menampilkan detail echart public regional insights.
 * @param {DataPct} DataPct - menampilkan DataPct.
 * @returns Untuk menampilkan detail echart public regional insights
 */
export default function DetailEchartPublicRegionalInsights({ dataPct }: { dataPct: any }) {
  const [options, setOptions] = useState<EChartsOption>({})
  const [dataChart, setDataChart] = useState<any>({
    infrastruktur: Number(dataPct[0].infrastruktur),
    keadilanSosial: Number(dataPct[0].keadilanSosial),
    kemiskinan: Number(dataPct[0].kemiskinan),
    lapanganPekerjaan: Number(dataPct[0].lapanganPekerjaan),
    layananKesehatan: Number(dataPct[0].layananKesehatan),
    pendidikan: Number(dataPct[0].pendidikan),
  })

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      title: {
        text: "PUBLIC CONCERNS TRENDS",
        textStyle: {
          color: "white",
          fontSize: 15
        }
      },
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
          data: ['Education', 'Health Services', 'Infrastructure', 'Poverty', 'Social Justice', 'Jobs'],
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
            color: "white",
            rotate: 25,
          },
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: Object.keys(dataChart ?? []).map(
            (v: any, i: any) =>
            ({
              name: v,
              value: dataChart[v],
              itemStyle: {
                color:
                  COLOR_EMOTION.find((v2) => v2.id == String(i))
                    ?.color ?? "gray",
              },
            })
          ),
        },
      ],
    };
    setOptions(option);
  }
  return (
    <>
      <Box>
        <EChartsReact style={{ width: "100%" }} option={options} />
      </Box>
    </>
  );
}



