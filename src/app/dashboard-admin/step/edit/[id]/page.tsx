import { funGetAllCandidate } from '@/modules/_global';
import funGetOneStep from '@/modules/step/back/fun/get_one_step';
import ViewEditStep from '@/modules/step/back/view/view_edit_step';
import React from 'react';

export default async function Page({params}: {params: {id: Number}}) {
  const data = await funGetOneStep({id: params.id})
  const dataCandidate = await funGetAllCandidate()
  return (
    <>
    <ViewEditStep data={data} dataCan={dataCandidate}/>
    </>
  );
}
