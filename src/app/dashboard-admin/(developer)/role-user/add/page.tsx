import funGetAllComponents from '@/modules/user/role/fun/get_all_components';
import ViewAddRoleUser from '@/modules/user/role/view/view_add_role_user';
import React from 'react';

export default async function Page() {
  const data = await funGetAllComponents()
  return (
    <>
    <ViewAddRoleUser data={data}/>
    </>
  );
}

