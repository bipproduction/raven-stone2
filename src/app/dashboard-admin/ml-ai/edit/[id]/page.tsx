
import { funGetAllPaslon } from '@/modules/_global';
import { ViewEditAdminMlai } from '@/modules/ml_ai';
import funGetOneMlAi from '@/modules/ml_ai/back/fun/get_one_Ml_ai';
import _ from 'lodash';
import React from 'react';

export default async function Page({params}: {params: {id: string}}) {
  // const today = new Date();
  // const dataMlai = {
  //     idPaslon: (_.isNaN(Number(searchParams.paslon)) ? 1 : Number(searchParams.paslon)),
  //     date: (_.isUndefined(searchParams.date) ? today : new Date(searchParams.date))
  // }

  const dataPaslon = await funGetAllPaslon()
  const GetOnMl = await funGetOneMlAi({id: params.id})
  return (
    <>
    <ViewEditAdminMlai  paslon={dataPaslon} data={GetOnMl}/>
    </>
  );
}
