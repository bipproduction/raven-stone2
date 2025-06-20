import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment"

export const dynamic = "force-dynamic"
export async function GET() {
   const today = moment().format('YYYY-MM-DD')
   const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
   const tlp = [628980185458, 6289697338821]

   async function sendWA(kategori: string) {
      let kalimat = ''

      if (kategori == 'sukses') {
         kalimat = '*RAVEN* : copy data kandidat *sukses*'
      } else if (kategori == 'already-exist') {
         kalimat = '*RAVEN* : copy data kandidat *gagal* karena data hari ini telah tersedia'
      } else if (kategori == 'data-unavailable') {
         kalimat = '*RAVEN* : copy data kandidat *gagal* karena tidak ada data dihari sebelumnya'
      }

      for (let index = 0; index < tlp.length; index++) {
         await fetch(`https://wa.wibudev.com/code?nom=${tlp[index]}&text=${kalimat}`, {
            cache: "no-cache"
         })
         // .then(
         //    async (res) => {
         //       if (res.status == 200) {
         // console.log('berhasil' + tlp[index])
         //       } else {
         // console.log('gagal' + tlp[index])
         //       }
         //    }
         // )
      }
   }

   // data emosi kemarin
   const dataEmotionYesterday = await prisma.candidateEmotion.findMany({
      where: {
         dateEmotion: new Date(yesterday)
      },
      select: {
         timeEmotion: true,
         idKabkot: true,
         idCandidate: true,
         idProvinsi: true,
         negative: true,
         positive: true,
         supportive: true,
         uncomfortable: true,
         undecided: true,
         unsupportive: true,
         confidence: true,
         dissapproval: true,
      }
   })


   // cek data kemaren
   if (dataEmotionYesterday.length > 0) {
      // data candidate yg ada emosinya hari ini
      const dataCandidateToday = await prisma.candidateEmotion.groupBy({
         where: {
            dateEmotion: new Date(today)
         },
         by: 'idCandidate'
      })

      // data emosi yg sudah terfilter (by candidate id hari ini)
      const dataFilter = dataEmotionYesterday.filter(x => !dataCandidateToday.some(y => y.idCandidate === x.idCandidate));

      // cek data
      if (dataFilter.length > 0) {

         // omit data sesuai dg struktur database
         const dataTrue = dataFilter.map((v: any) => ({
            ..._.omit(v, ["timeEmotion", "idKabkot", "idCandidate", "idProvinsi", "negative", "positive", "supportive", "uncomfortable", "undecided", "unsupportive", "confidence", "dissapproval"]),
            dateEmotion: new Date(today),
            timeEmotion: v.timeEmotion,
            idKabkot: v.idKabkot,
            idCandidate: v.idCandidate,
            idProvinsi: v.idProvinsi,
            negative: v.negative,
            positive: v.positive,
            supportive: v.supportive,
            uncomfortable: v.uncomfortable,
            undecided: v.undecided,
            unsupportive: v.unsupportive,
            confidence: v.confidence,
            dissapproval: v.dissapproval,
         }));


         //   insert ke database
         const insert = await prisma.candidateEmotion.createMany({
            data: dataTrue
         })

         sendWA('sukses')
         // console.log(dataTrue)
         // console.log('sukses!!! dari tgl ' + yesterday + ' ke ' + today + '--' + new Date(today))
         return Response.json({ success: true, message: 'Success' })
      } else {
         sendWA('already-exist')
         // console.log('gagal!!! karena sudah ada data (dari tgl ' + yesterday + ' ke ' + today + '--' + new Date(today) + ')')
         return Response.json({ success: false, message: 'Data Already Exist' })
      }

   } else {
      sendWA('data-unavailable')
      // console.log('gagal!!! karena data kemaren kosong (dari tgl ' + yesterday + ' ke ' + today + '--' + new Date(today) + ')')
      return Response.json({ success: false, message: 'Empty Data Yesterday' })

   }



}