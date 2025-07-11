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
  const [dataChart, setDataChart] = useState<any>()

  useShallowEffect(() => {
    setDataChart({
      hard_worker: dataLta[0].pekerjaKeras,
      smart: dataLta[0].cerdas,
      honest: dataLta[0].jujur,
      populist: dataLta[0].merakyat,
      firm: dataLta[0].tegas,
      leading_experince: dataLta[0].berpengalamanMemimpin,
      achievement: dataLta[0].berprestasi,
      military_background: dataLta[0].latarBelakangMiliter,
      religious: dataLta[0].agamis,
    })
    loadData(dataChart)
  }, [dataLta, dataChart])

  const loadData = (dataLoad: any) => {
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
        data: _.keys(dataLoad).map((v) => (v)).filter((v) => v != "name" && v != "idProvinsi"),
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: "white",
          fontSize: "10",
          formatter: function (params: any) {
            return _.startCase(params);
          },
        },
        startAngle: 60,
      },
      series: [
        {
          name: "Direct",
          type: "bar",
          coordinateSystem: "polar",
          barWidth: 80,
          data: Object.keys(dataLoad ?? []).map(
            (v: any, i: any) =>
            ({
              name: v,
              value: dataLoad[v],
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
