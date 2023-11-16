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


/**
 * Fungsi untuk menampilkan echart jokowi effect.
 * @returns {component} menampilakn echart jokowi effect.
 */
export default function EchartJokowiEffect({ data }: { data: any }) {
    const [options, setOptions] = useState<EChartsOption>({})
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null])
    const [showPopDate, setPopDate] = useState(false)
    const [listData, setListData] = useState(data)
    const [isButton, setButton] = useState('month')
    const [newDateStart, setNewDateStart] = useState(moment(new Date("2023-09-01")).format("YYYY-MM-DD"))
    const [newDateEnd, setNewDateEnd] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [okButton, setOkButton] = useState(false)


    async function onChooseTime(time: any) {
        let startDate
        setButton(time)
        let endDate = moment(new Date()).format('YYYY-MM-DD')
        if (time == 'month') {
            startDate = moment(new Date()).subtract(1, "months").format("YYYY-MM-DD")
        } else if (time == 'week') {
            startDate = moment(new Date()).subtract(7, "days").format("YYYY-MM-DD");
        }else if(time=='custom'){
            startDate = newDateStart
            endDate = newDateEnd
        }

        const loadChart = await funGetEmotionCandidateChartFront({ candidate: 7, startDate: startDate, endDate: endDate })
        setListData(loadChart)

        if(time == 'custom') setPopDate(false)
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
            // grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '3%',
            //     containLabel: true
            // },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.date),
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
                    sampling: "lttb",
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.5,
                        color: WARNA.hijau
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.positive),
                },
                {
                    name: 'Neutral',
                    type: 'line',
                    sampling: "lttb",
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.5,
                        color: "white"
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.neutral),
                },
                {
                    name: 'Negative',
                    type: 'line',
                    sampling: "lttb",
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.5,
                        color: WARNA.merah
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: !dataChart
                        ? []
                        : dataChart!.map((v: any) => v.negative),
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
                        <Button variant={(isButton == 'month') ? 'filled' : 'subtle'} c={"white"} onClick={() => onChooseTime('month')}>Month</Button>
                        <Divider orientation="vertical" />
                        <Button variant={(isButton == 'week') ? 'filled' : 'subtle'} c={"white"} onClick={() => onChooseTime('week')}>Week</Button>
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
                                        minDate={new Date('2023-09-01')}
                                        maxDate={new Date()}
                                        onChange={(v) => {
                                            if (v[0] && v[1]) {
                                                const diferent = moment(v[1]).diff(
                                                    moment(v[0]),
                                                    "days"
                                                );

                                                if (diferent < 8)
                                                    return toast('Please select date more than 7 days, or user 1 week option button', { theme: 'dark' });
                                                setNewDateStart(moment(v[0]).format("YYYY-MM-DD"))
                                                setNewDateEnd(moment(v[1]).format("YYYY-MM-DD"))
                                                setOkButton(true);
                                            } else {
                                                setOkButton(false);
                                            }
                                        }
                                        }
                                    />
                                    <Group justify="space-between" mt={10} >
                                        <Box
                                            onClick={() => setPopDate(false)}
                                            w={100}
                                            p={10}
                                            variant="outline"
                                            style={{
                                                backgroundColor: 'white'
                                            }}
                                        >
                                            CANCEL
                                        </Box>
                                        {okButton && (
                                            <Button
                                                onClick={()=>{onChooseTime('custom')}}
                                                w={100}
                                                variant="filled"
                                            >
                                                OK
                                            </Button>
                                        )}
                                    </Group>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
                <EChartsReact style={{ height: 250 }} option={options} />
            </Box >
        </>
    )
}


