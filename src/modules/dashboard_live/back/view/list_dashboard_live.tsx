import { Box, SimpleGrid } from '@mantine/core';
import React from 'react';
import ListNotification from './list_notification';
import ListPersen from './list_persen';


/**
 * Fungsi untuk menampilkan list dashboard live.
 * @param {data} data - menampilkan data.
 * @param {persen} persen - menampilkan persen.
 * @returns Untuk menampilkan list dashboard live
 */
export default async function ListDashboardLive({data, persen}: {data: any, persen: any}) {
    return (
        <>
            <SimpleGrid
                cols={{ base: 1, sm: 1, lg: 1 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
                <Box>
                    <ListPersen persen={persen} />
                </Box>
                <Box pt={30}>
                    <ListNotification data={data}  />
                </Box>
            </SimpleGrid>
        </>
    );
}

