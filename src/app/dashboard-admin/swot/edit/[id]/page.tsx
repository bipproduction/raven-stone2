import { funGetAllCandidate } from '@/modules/_global';
import funGetOneSwot from '@/modules/swot/back/fun/get_one_swot';
import ViewEditSwot from '@/modules/swot/back/view/view_edit_swot';
import React from 'react';

export default async function Page({ params }: { params: { id: Number } }) {
  const data = await funGetOneSwot({id: params.id})
  const dataCan = await funGetAllCandidate()
  return (
    <>
      <ViewEditSwot data={data} dataCan={dataCan} />
    </>
  );
}

