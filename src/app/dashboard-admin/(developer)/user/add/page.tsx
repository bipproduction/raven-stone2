import { ViewAddSettingUser } from '@/modules/user';
import funGetAllRole from '@/modules/user/role/fun/get_all_role';
import React from 'react';

export default async function Page() {
  const roleUser = await funGetAllRole()
  return (
    <ViewAddSettingUser roleUser={roleUser}/>
  );
}
