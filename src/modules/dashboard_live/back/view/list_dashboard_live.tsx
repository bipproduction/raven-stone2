import { Box, SimpleGrid } from '@mantine/core';
import React from 'react';
import ListNotification from './list_notification';
import ListPersen from './list_persen';

export default function ListDashboardLive() {
    return (
        <>
            <SimpleGrid
                cols={{ base: 1, sm: 1, lg: 1 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
                <Box>
                    <ListPersen />
                </Box>
                <Box pt={30}>
                    <ListNotification />
                </Box>
            </SimpleGrid>
        </>
    );
}

