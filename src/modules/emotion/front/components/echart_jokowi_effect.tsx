'use client'

import { useShallowEffect } from '@mantine/hooks'
import React, { useState } from 'react'
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { ActionIcon, Box, Button, Divider, Group, Menu, Stack, Title } from '@mantine/core';
import { WARNA } from '@/modules/_global';
import { DatePicker } from '@mantine/dates';
import moment from 'moment';
import toast from 'react-simple-toasts';
import { HiDotsHorizontal } from 'react-icons/hi';


/**
 * Fungsi untuk menampilkan echart jokowi effect.
 * @returns {component} menampilakn echart jokowi effect.
 */
export default function EchartJokowiEffect() {
    const [options, setOptions] = useState<EChartsOption>({})
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const [showPopDate, setPopDate] = useState(false);

    useShallowEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        const option: EChartsOption = {
            color: ['red', 'gray', 'green'],
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLabel: {
                        color: "white"
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: true,
                    axisLabel: {
                        color: "white"
                    }
                },
            ],
            series: [
                {
                    name: 'Negative',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 1,
                        color: WARNA.merah
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [100, 32, 101, 64, 90, 40, 50]
                },
                {
                    name: 'Neutral',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 1,
                        color: "white"
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [20, 82, 111, 23, 22, 34, 31]
                },
                {
                    name: 'Positive',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 1,
                        color: WARNA.hijau
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [20, 22, 22, 14, 19, 30, 12]
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
                        <Button variant='subtle' c={"white"}>Month</Button>
                        <Divider orientation="vertical" />
                        <Button variant='subtle' c={"white"}>Week</Button>
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
                <EChartsReact style={{ height: 250 }} option={options} />
            </Box>
        </>
    )
}


