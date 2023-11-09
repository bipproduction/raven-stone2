import { ViewEditRoleUser } from '@/modules/user';
import funGetOneRoleUser from '@/modules/user/role/fun/get_one_role_user';
import React from 'react';

export default async function Page({params}: {params: {id: number}}) {
  const data =  await funGetOneRoleUser({id: params.id})
  return (
    <>
    <ViewEditRoleUser data={data}/>
    </>
  );
}
