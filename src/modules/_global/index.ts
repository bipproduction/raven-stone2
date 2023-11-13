import ButtonBack from "./back/component/button_back";
import LayoutAdmin from "./back/component/layout_admin";
import funGetAccessAdmin from "./back/fun/get_access_admin";
import prisma from "./bin/prisma";
import PageSubTitle from "./front/components/PageSubtitle";
import { WARNA } from "./fun/COLOR";
import { COLOR_EMOTION, COLOR_LEADER } from "./fun/COLOR_EMOTION";
import funCekAkses from "./fun/cek_access";
import { countKabkot } from "./fun/count_kabkot";
import { countProvince } from "./fun/count_province";
import funGetAllCandidate from "./fun/get_all_candidate";
import funGetAllPaslon from "./fun/get_all_paslon";
import funGetAllProvince from "./fun/get_all_province";
import funGetKabkotByProvinsi from "./fun/get_kabkot_by_province";
import funGetOneCandidate from "./fun/get_one_candidate";
import funGetOnePaslon from "./fun/get_one_paslon";
import funGetOneProvinsi from "./fun/get_one_provinsi";

export { prisma }
export { LayoutAdmin }
export { ButtonBack }
export { countProvince }
export { countKabkot }
export { funGetAllCandidate }
export { funGetAllPaslon }
export { funGetOnePaslon }
export { funGetAllProvince }
export { funGetOneCandidate }
export { funCekAkses }
export { funGetAccessAdmin }
export { COLOR_EMOTION }
export { COLOR_LEADER }
export { WARNA }
export { PageSubTitle }
export { funGetOneProvinsi }
export { funGetKabkotByProvinsi }
