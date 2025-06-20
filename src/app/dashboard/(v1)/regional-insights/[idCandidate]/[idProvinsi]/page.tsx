import { ViewDetailRegionalInsights } from '@/modules/regional_insights';
import React from 'react';
import _ from "lodash"
import { redirect } from 'next/navigation';
import { funGetAudienceByProvFront } from '@/modules/audience';
import { funGetRhiFront } from '@/modules/region_hot_issue';
import { funGetLtaFrontKab } from '@/modules/leader_trait_assessment';
import { funGetEmotionDetailRegionalFront } from '@/modules/emotion';
import { funGetPctFrontKab } from '@/modules/public_concern_trend';
import { funGetKabkotByProvinsi, funGetOneProvinsi } from '@/modules/_global';

export default async function Page({ params }: { params: { idCandidate: string, idProvinsi: string } }) {

  if (
    Number(params.idCandidate) < 1 ||
    Number(params.idCandidate) > 7 ||
    _.isNaN(Number(params.idCandidate)) ||
    Number(params.idProvinsi) < 1 ||
    Number(params.idProvinsi) > 38 ||
    _.isNaN(Number(params.idProvinsi))
  )
    return redirect('/dashboard/regional-insights')

  const dAudience = await funGetAudienceByProvFront({ provinsi: params.idProvinsi })
  const dRhi = await funGetRhiFront({ provinsi: params.idProvinsi })
  const dLta = await funGetLtaFrontKab({ provinsi: params.idProvinsi })
  const dPct = await funGetPctFrontKab({ provinsi: params.idProvinsi })
  const dEmotion = await funGetEmotionDetailRegionalFront({ candidate: params.idCandidate, provinsi: params.idProvinsi })
  const dArea = await funGetOneProvinsi({ id: params.idProvinsi })
  const dKabupaten = await funGetKabkotByProvinsi({ provinsi: params.idProvinsi })

  return (
    <>
      <ViewDetailRegionalInsights parameter={{ idCandidate: params.idCandidate, idProvinsi: params.idProvinsi }} emotion={dEmotion} audience={dAudience} rhi={dRhi} lta={dLta} pct={dPct} region={dArea} kabupaten={dKabupaten} />
    </>
  );
}

