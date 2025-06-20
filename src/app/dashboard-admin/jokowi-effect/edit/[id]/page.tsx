import { ViewEditAdminJokowi } from '@/modules/jokowi_effect';
import funGetOneJokowiEffect from '@/modules/jokowi_effect/back/fun/get_one_jokowi_effect';
import React from 'react';

export default async function Page({params}: {params: {id: string}}) {

  const data = await funGetOneJokowiEffect({id: params.id})
  return (
    <ViewEditAdminJokowi data={data}/>
  );
}
