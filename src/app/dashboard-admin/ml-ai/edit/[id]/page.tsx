
import { funGetAllPaslon } from '@/modules/_global';
import { ViewEditAdminMlai } from '@/modules/ml_ai';
import _ from 'lodash';
import React from 'react';

export default async function Page({ searchParams }: { searchParams: {content: string, paslon: string, date: string } }) {
  const today = new Date();
  const dataMlai = {
      idPaslon: (_.isNaN(Number(searchParams.paslon)) ? 1 : Number(searchParams.paslon)),
      date: (_.isUndefined(searchParams.date) ? today : new Date(searchParams.date))
  }

  const dataPaslon = await funGetAllPaslon()
  return (
    <>
    <ViewEditAdminMlai  paslon={dataPaslon} params={dataMlai}/>
    </>
  );
}
