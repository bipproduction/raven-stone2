import funDownloadEmotionCandidateByDate from "./back/fun/download_emotion_candidate_by_date";
import funDownloadEmotionPaslonDate from "./back/fun/download_emotion_paslon_by_date";
import funGetEmotionCandidateDateArea from "./back/fun/get_emotion_candidate_by_date_area";
import funGetEmotionPaslonDateArea from "./back/fun/get_emotion_paslon_by_date_area";
import ViewAdminEmotionCandidate from "./back/view/view_admin_emotion_candidate";
import ViewAdminEmotionPaslon from "./back/view/view_admin_emotion_paslon";
import ViewCopyEmotionCandidate from "./back/view/view_copy_emotion_candidate";
import ViewCopyEmotionPaslon from "./back/view/view_copy_emotion_paslon";
import ViewDeleteEmotion from "./back/view/view_delete_emotion";
import ViewGenerateEmotionCandidate from "./back/view/view_generate_emotion_candidate";
import ViewGenerateEmotionPaslon from "./back/view/view_generate_emotion_paslon";
import ViewUploadEmotionCandidate from "./back/view/view_upload_emotion_candidate";
import ViewUploadEmotionPaslon from "./back/view/view_upload_emotion_paslon";
// NOTE: Komponen chart berbasis echarts (DetailRegionalDataPairing, DetailSentimentAnalysis,
// EchartJokowiEffect, SentimentAnalysis) SENGAJA tidak di-re-export dari barrel ini.
// echarts menyentuh `window` saat import, sehingga meng-export-nya di sini menyeret echarts
// ke SSR graph setiap kali ada yang meng-import fungsi apa pun dari barrel → "window is not defined".
// Consumer harus meng-import komponen itu langsung via `next/dynamic(..., { ssr: false })`.
// Lihat src/modules/emotion/front/view/ssr_safe_echarts.test.ts.
import Top10JokowiEffect from "./front/components/top10_jokowi_effect";
import funGetEmotionCandidateChartFront from "./front/fun/get_emotion_candidate_chart_front";
import funGetEmotionDetailRegionalFront from "./front/fun/get_emotion_detail_regional_front";
import funGetEmotionJokowiEffectAreaFront from "./front/fun/get_emotion_jokowi_effect_area_front";
import funGetEmotionPaslonChartFront from "./front/fun/get_emotion_paslon_chart_front";
import funGetEmotionPaslonAreaFront from "./front/fun/get_emotion_paslon_table";
import funGetEmotionPersenJokowiFront from "./front/fun/get_emotion_persen_jokowi_front";
import funGetEmotionPersenPaslonFront from "./front/fun/get_emotion_persen_paslon";
import funGetEmotionRegionalFront from "./front/fun/get_emotion_regional_front";
import funGetKabkotEmotionPaslon from "./front/fun/get_kabkot_emotion_paslon";
import funGetProvinsiEmotionPaslon from "./front/fun/get_provinsi_emotion_paslon";
import ViewSummary from "./front/view/view_summary";

export { ViewAdminEmotionCandidate }
export { ViewAdminEmotionPaslon }
export { funGetEmotionCandidateDateArea }
export { funDownloadEmotionCandidateByDate }
export { ViewSummary }
export { funGetEmotionPaslonDateArea }
export { funDownloadEmotionPaslonDate }
export { ViewUploadEmotionPaslon }
export { ViewUploadEmotionCandidate }
export { ViewCopyEmotionPaslon }
export { ViewCopyEmotionCandidate }
export { Top10JokowiEffect }
export { funGetEmotionRegionalFront }
export { funGetEmotionDetailRegionalFront }
export { funGetEmotionJokowiEffectAreaFront }
export { funGetEmotionPersenJokowiFront }
export { funGetEmotionCandidateChartFront }
export { ViewDeleteEmotion }
export { funGetEmotionPaslonAreaFront }
export { funGetEmotionPersenPaslonFront }
export { funGetEmotionPaslonChartFront }
export { funGetProvinsiEmotionPaslon }
export { funGetKabkotEmotionPaslon }
export { ViewGenerateEmotionCandidate }
export { ViewGenerateEmotionPaslon }