import funGetAllRole from '@/modules/user/role/fun/get_all_role';
import { funGetAllSetUser } from '@/modules/user/setting_user/fun/get_all_set_user';
import funGetOneSetUser from '@/modules/user/setting_user/fun/get_one_set_user';
import ViewEditSettingUser from '@/modules/user/setting_user/view/view_edit_setting_user';
import React from 'react';

export default async function Page({params}: {params: {id: string}}) {
  const  roleUser = await funGetAllRole()
  const data = await funGetOneSetUser({id: params.id})
  return (
    <ViewEditSettingUser roleUser={roleUser} data={data}/>
  );
}
