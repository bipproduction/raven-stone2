'use client'

import { useShallowEffect } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { ActionIcon, Box, Button, Divider, Group, Menu, Stack, Title } from '@mantine/core';
import { WARNA } from '@/modules/_global';
import { DatePicker } from '@mantine/dates';
import moment from 'moment';
import toast from 'react-simple-toasts';
import { HiDotsHorizontal } from 'react-icons/hi';
import { funGetEmotionCandidateChartFront } from '../..';
import * as echarts from 'echarts';


/**
 * Fungsi untuk menampilkan echart jokowi effect.
 * @returns {component} menampilakn echart jokowi effect.
 */
export default function EchartJokowiEffect({ data }: { data: any }) {
    const [options, setOptions] = useState<EChartsOption>({})
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null])
    const [showPopDate, setPopDate] = useState(false)
    const [listData, setListData] = useState(data)

    async function onChooseTime(time: any) {
        let startDate
        const endDate = moment(new Date()).format('YYYY-MM-DD')
        if (time == 'month') {
            startDate = moment(new Date()).subtract(1, "months").format("YYYY-MM-DD")
        } else if (time == 'week') {
            startDate = moment(new Date()).subtract(7, "days").format("YYYY-MM-DD");
        }

        const loadChart = await funGetEmotionCandidateChartFront({ candidate: 7, startDate: startDate, endDate: endDate })
        setListData(loadChart)
    }

    useEffect(() => {
        loadData(listData)
    }, [listData])

    const loadData = (dataChart: any) => {
        const option: EChartsOption = {
            color: ['green', 'gray', 'red'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
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
                    boundaryGap: false,
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => moment(v.date).format('DD-MM-YYYY')),
                    axisLabel: {
                        color: "white",
                        rotate: 30
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: true,
                    max: "100",
                    splitLine: {
                        lineStyle: {
                            color: "gray",
                            opacity: 0.5
                        }
                    },
                    axisLabel: {
                        formatter: `{value}% `,
                        color: "white"
                    },
                },
            ],
            series: [
                {
                    name: 'Positive',
                    type: 'line',
                    showSymbol: false,
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.positive),
                    stack: 'z',
                    color: 'green',
                    areaStyle: {
                        opacity: 1,
                        color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
                            {
                                offset: 0,
                                color: 'rgb(35,13,55)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(8,106,24,1)'
                            }
                        ])
                    },
                    smooth: true,
                },
                {
                    name: 'Neutral',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.neutral),
                    color: "white",
                    stack: 'x',
                    areaStyle: {
                        opacity: 1,
                        color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
                            {
                                offset: 0,
                                color: 'rgb(35,13,55)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,255,1)'
                            }
                        ])
                    }
                },
                {
                    name: 'Negative',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.negative),
                    color: "red",
                    stack: 'y',
                    areaStyle: {
                        opacity: 1,
                        color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
                            {
                                offset: 0,
                                color: 'rgb(35,13,55)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(124,3,13,1)'
                            }
                        ])
                    }
                },

            ]
        }
        setOptions(option);
    }

    return (
        <>
            <Box>
                <Group justify='flex-end'>
                    <Group>
                        <Button variant='subtle' c={"white"} onClick={() => onChooseTime('month')}>Month</Button>
                        <Divider orientation="vertical" />
                        <Button variant='subtle' c={"white"} onClick={() => onChooseTime('week')}>Week</Button>
                        <Divider orientation="vertical" />
                        <Menu opened={showPopDate} position='bottom-end'>
                            <Menu.Target>
                                <Button variant='subtle' c={"white"} onClick={() => setPopDate(true)}>Custom</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>
                                    <DatePicker
                                        type="range"
                                        value={value}
                                        onChange={setValue}
                                        minDate={new Date('2023-09-01')}
                                        maxDate={new Date()}
                                    />
                                    <Group justify="space-between" mt={10}>
                                        <Button
                                            onClick={() => setPopDate(false)}
                                            w={100}
                                            variant="outline"
                                        >
                                            CANCEL
                                        </Button>
                                    </Group>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
                <EChartsReact style={{ 
                    height: 300, width: "auto"
                 }} option={options} />
            </Box>
        </>
    )
}


