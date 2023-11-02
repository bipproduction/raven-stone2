import ButtonBack from "./back/component/button_back";
import LayoutAdmin from "./back/component/layout_admin";
import prisma from "./bin/prisma";
import { countKabkot } from "./fun/count_kabkot";
import { countProvince } from "./fun/count_province";
import funGetAllCandidate from "./fun/get_all_candidate";
import funGetAllPaslon from "./fun/get_all_paslon";
import funGetAllProvince from "./fun/get_all_province";
import funGetOneCandidate from "./fun/get_one_candidate";
import funGetOnePaslon from "./fun/get_one_paslon";

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