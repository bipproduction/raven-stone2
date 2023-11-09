import { ViewEditRoleUser } from '@/modules/user';
import funGetAllComponents from '@/modules/user/role/fun/get_all_components';
import funGetOneRoleUser from '@/modules/user/role/fun/get_one_role_user';
import React from 'react';

export default async function Page({ params }: { params: { id: number } }) {
  const data = await funGetOneRoleUser({ id: params.id })
  const dataComponent = await funGetAllComponents()
  return (
    <>
      <ViewEditRoleUser data={data} component={dataComponent} />
    </>
  );
}
