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
            { 
              value: 48, 
              name: 'Confidence' ,
              itemStyle:{
                color: "#026D00"
              }
            },
            { 
              value: 35, 
              itemStyle:{
                color: "#62A334"
              },
              name: 'Supportive' 
            },
            { 
              value: 80, 
              itemStyle:{
                color: "#62C63F"
              },
              name: 'Positive' 
            },
            { 
              value: 48, 
              itemStyle:{
                color: "#8EE886"
              },
              name: 'Undecided' 
            },
            { 
              value: 30, 
              itemStyle:{
                color: "#ED8C8C"
              },
              name: 'Unsupportive' 
            },
            { 
              value: 30, 
              itemStyle:{
                color: "#D13232"
              },
              name: 'Uncomfortable' 
            },
            { 
              value: 30, 
              itemStyle:{
                color: "#DD0202"
              },
              name: 'Negative' 
            },
            { 
              value: 20, 
              itemStyle:{
                color: "#790000"
              },
              name: 'Disapproval'
             },
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
