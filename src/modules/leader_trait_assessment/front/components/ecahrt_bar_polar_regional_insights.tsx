'use client'

import { COLOR_EMOTION } from '@/modules/_global';
import { Box, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import _ from 'lodash';
import React, { useState } from 'react';


/**
 * Fungsi untuk menampilkan menampilkan echart bat polar regional insights.
 * @param {dataLta} dataLta - menampilkan dataLta.
 * @returns Untuk menampilkan menampilkan echart bat polar regional insights
 */
export default function EcahrtBarPolarRegionalInsights({ dataLta }: { dataLta: any }) {
  const [options, setOptions] = useState<EChartsOption>({})
  const total = _.sum([
    dataLta[0].pekerjaKeras,
    dataLta[0].cerdas,
    dataLta[0].jujur,
    dataLta[0].merakyat,
    dataLta[0].tegas,
    dataLta[0].berpengalamanMemimpin,
    dataLta[0].berprestasi,
    dataLta[0].latarBelakangMiliter,
    dataLta[0].agamis,
  ])

  const [dataChart, setDataChart] = useState<any>({
    pekerjaKeras: _.round((Number(dataLta[0].pekerjaKeras) / total) * 100, 2),
    cerdas: _.round((Number(dataLta[0].cerdas) / total) * 100, 2),
    jujur: _.round((Number(dataLta[0].jujur) / total) * 100, 2),
    merakyat: _.round((Number(dataLta[0].merakyat) / total) * 100, 2),
    tegas: _.round((Number(dataLta[0].tegas) / total) * 100, 2),
    berpengalamanMemimpin: _.round((Number(dataLta[0].berpengalamanMemimpin) / total) * 100, 2),
    berprestasi: _.round((Number(dataLta[0].berprestasi) / total) * 100, 2),
    latarBelakangMiliter: _.round((Number(dataLta[0].latarBelakangMiliter) / total) * 100, 2),
    agamis: _.round((Number(dataLta[0].agamis) / total) * 100, 2),
  })

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      radiusAxis: {},
      polar: {},
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params: any) {
          return _.upperCase(params[0].name) + " : " + params[0].value + "%";
        },
      },
      angleAxis: {
        type: "category",
        data: ['Honest', 'Military Background', 'Religius', 'Achievement', 'Leading Experience', 'Smart', 'Firm', 'Hard Worker', 'Populist'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: "white",
          fontSize: "10",
        },
        startAngle: 60,
      },
      series: [
        {
          name: "Direct",
          type: "bar",
          coordinateSystem: "polar",
          barWidth: 80,
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
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      ],
    };
    setOptions(option);
  }
  return (
    <>
      <Box>
        <Text ta={'center'} fz={16} c={"white"} fw={'bold'}>LEADER TRAIT ASSESSMENT
        </Text>
        <EChartsReact
          style={{
            width: "100%",
          }}
          option={options}
        />
      </Box>

    </>
  );
}
