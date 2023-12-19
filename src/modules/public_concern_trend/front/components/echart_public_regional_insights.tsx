'use client'
import { COLOR_EMOTION, COLOR_PCT } from '@/modules/_global';
import { Box, Group, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import _ from 'lodash';
import React, { useState } from 'react';

/**
 * Fungsi untuk menampilkan echart public regional insights.
 * @param {DataPct} DataPct - menampilkan DataPct.
 * @returns Untuk menampilkan echart public regional insights
 */

export default function EchartPublicRegionalInsights({ dataPct }: { dataPct: any }) {
  const [options, setOptions] = useState<EChartsOption>({})
  const [dataChart, setDataChart] = useState<any>({
    infrastructure: Number(dataPct[0].infrastruktur),
    social_justice: Number(dataPct[0].keadilanSosial),
    poverty: Number(dataPct[0].kemiskinan),
    jobs: Number(dataPct[0].lapanganPekerjaan),
    health_services: Number(dataPct[0].layananKesehatan),
    education: Number(dataPct[0].pendidikan),
  })


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
        formatter: function (params: any) {
          return (
            _.upperCase(params[0].name) +
            " : " +
            Intl.NumberFormat().format(params[0].value)
          );
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
          data: _.keys(dataChart).map((v) => (v)).filter((v) => v != "name" && v != "idProvinsi"),
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            color: "white",
            fontSize: "12",
            fontWeight: "bold",
            formatter: function (params: any) {
              return (
                _.startCase(params)
              );
            },
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
                color: COLOR_PCT[i],
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
        <Group >
          <Text c={"white"} fw={'bold'}>PUBLIC CONCERNS TRENDS</Text>
        </Group>
        <EChartsReact style={{ width: "100%" }} option={options} />
      </Box>
    </>
  );
}

