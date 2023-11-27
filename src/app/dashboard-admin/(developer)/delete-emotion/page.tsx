import { funGetAllPaslon } from '@/modules/_global';
import { ViewDeleteEmotion, funGetEmotionCandidateDateArea } from '@/modules/emotion';
import funGetAllEmotionPaslon from '@/modules/emotion/back/fun/get_all_emotion_paslon';
import _ from 'lodash';
import React from 'react';

export default async function Page({ searchParams }: { searchParams: { paslon: any,  } }) {
  const findData = {
    idPaslon: (_.isNaN(Number(searchParams.paslon)) ? 1 : Number(searchParams.paslon)),
    // date: (_.isUndefined(searchParams.date) ? new Date() : new Date(searchParams.date)),
  }

  const dataPaslon = await funGetAllPaslon()
  return (
    <>
      <ViewDeleteEmotion paslon={dataPaslon}  />
    </>
  );
}
