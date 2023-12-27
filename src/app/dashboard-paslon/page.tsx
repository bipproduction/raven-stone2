import { DashboardLive2Paslon } from '@/modules/dahsboard_live_2_paslon';
import { funGetAllNotif, funGetPersenLiveFront } from '@/modules/dashboard_live';
import { funGetEmotionPersenPaslonFront } from '@/modules/emotion';
import React from 'react';

export default async function Page() {
  const dataPersen = await funGetPersenLiveFront()
  const dataNotif = await funGetAllNotif()
  const dataEmotionPersen = await funGetEmotionPersenPaslonFront()
  return (
    <>
    <DashboardLive2Paslon dataPersen={dataPersen} dataNotif={dataNotif} emotionPersen={dataEmotionPersen} />
    </>
  );
}

