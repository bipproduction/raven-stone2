import { ViewSettingUser } from '@/modules/user';
import { funGetAllSetUser } from '@/modules/user/setting_user/fun/get_all_set_user';
import React from 'react';

export default async function Page() {
  const data = await funGetAllSetUser()
  return (
    <ViewSettingUser data={data} />
  );
}
