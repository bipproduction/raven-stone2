import { funGetAllCandidate } from '@/modules/_global';
import ViewAddSwot from '@/modules/swot/back/view/view_add_swot';
import React from 'react';

export default async function Page() {
  const dataCan = await funGetAllCandidate()
  return (
    <>
    <ViewAddSwot candidate={dataCan}/>
    </>
  );
}

