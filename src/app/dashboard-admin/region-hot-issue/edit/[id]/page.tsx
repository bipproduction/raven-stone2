import funGetOneRhi from '@/modules/region_hot_issue/back/fun/get_one_rhi';
import ViewEditRhi from '@/modules/region_hot_issue/back/view/view_edit_rhi';
import React from 'react';

export default async function Page({ params }: { params: { id: any } }) {
    const dataOne = await funGetOneRhi({id: params.id})
    return (
        <>
        <ViewEditRhi data={dataOne}/>
        </>
    );
}
