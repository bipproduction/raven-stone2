-- CreateTable
CREATE TABLE "Component" (
    "id" SERIAL NOT NULL,
    "menu" TEXT,
    "label" TEXT,
    "keyMenu" TEXT,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccess" (
    "id" SERIAL NOT NULL,
    "idUserRole" INTEGER NOT NULL,
    "idComponent" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "idUserRole" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isAllArea" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLog" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaProvinsi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AreaProvinsi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaKabkot" (
    "id" SERIAL NOT NULL,
    "idProvinsi" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AreaKabkot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paslon" (
    "id" SERIAL NOT NULL,
    "nameCapres" TEXT NOT NULL,
    "imgCapres" TEXT NOT NULL,
    "nameCawapres" TEXT NOT NULL,
    "imgCawapres" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paslon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audience" (
    "id" SERIAL NOT NULL,
    "idProvinsi" INTEGER,
    "idKabkot" INTEGER,
    "value" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicConcernTrend" (
    "id" SERIAL NOT NULL,
    "idProvinsi" INTEGER,
    "idKabkot" INTEGER,
    "pendidikan" INTEGER NOT NULL,
    "infrastruktur" INTEGER NOT NULL,
    "layananKesehatan" INTEGER NOT NULL,
    "kemiskinan" INTEGER NOT NULL,
    "lapanganPekerjaan" INTEGER NOT NULL,
    "keadilanSosial" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicConcernTrend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderTraitAssessment" (
    "id" SERIAL NOT NULL,
    "idProvinsi" INTEGER,
    "idKabkot" INTEGER,
    "pekerjaKeras" INTEGER NOT NULL,
    "cerdas" INTEGER NOT NULL,
    "jujur" INTEGER NOT NULL,
    "merakyat" INTEGER NOT NULL,
    "tegas" INTEGER NOT NULL,
    "berpengalamanMemimpin" INTEGER NOT NULL,
    "berprestasi" INTEGER NOT NULL,
    "latarBelakangMiliter" INTEGER NOT NULL,
    "agamis" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaderTraitAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionHotIssues" (
    "id" SERIAL NOT NULL,
    "idProvinsi" INTEGER,
    "idKabkot" INTEGER,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegionHotIssues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Swot" (
    "id" SERIAL NOT NULL,
    "idCandidate" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Swot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "idCandidate" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "sentiment" INTEGER NOT NULL DEFAULT 1,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MlAi" (
    "id" SERIAL NOT NULL,
    "idPaslon" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "dateContent" DATE NOT NULL,
    "timeContent" TIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MlAi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Effect" (
    "id" SERIAL NOT NULL,
    "idCandidate" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "dateContent" DATE NOT NULL,
    "timeContent" TIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Effect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateEmotion" (
    "id" TEXT NOT NULL,
    "idProvinsi" INTEGER,
    "idKabkot" INTEGER,
    "idCandidate" INTEGER NOT NULL,
    "dateEmotion" DATE NOT NULL,
    "confidence" INTEGER NOT NULL,
    "supportive" INTEGER NOT NULL,
    "positive" INTEGER NOT NULL,
    "undecided" INTEGER NOT NULL,
    "unsupportive" INTEGER NOT NULL,
    "uncomfortable" INTEGER NOT NULL,
    "negative" INTEGER NOT NULL,
    "dissapproval" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateEmotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaslonEmotion" (
    "id" TEXT NOT NULL,
    "idProvinsi" INTEGER,
    "idKabkot" INTEGER,
    "idPaslon" INTEGER NOT NULL,
    "dateEmotion" DATE NOT NULL,
    "confidence" INTEGER NOT NULL,
    "supportive" INTEGER NOT NULL,
    "positive" INTEGER NOT NULL,
    "undecided" INTEGER NOT NULL,
    "unsupportive" INTEGER NOT NULL,
    "uncomfortable" INTEGER NOT NULL,
    "negative" INTEGER NOT NULL,
    "dissapproval" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaslonEmotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserAccess" ADD CONSTRAINT "UserAccess_idUserRole_fkey" FOREIGN KEY ("idUserRole") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccess" ADD CONSTRAINT "UserAccess_idComponent_fkey" FOREIGN KEY ("idComponent") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idUserRole_fkey" FOREIGN KEY ("idUserRole") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLog" ADD CONSTRAINT "UserLog_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaKabkot" ADD CONSTRAINT "AreaKabkot_idProvinsi_fkey" FOREIGN KEY ("idProvinsi") REFERENCES "AreaProvinsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audience" ADD CONSTRAINT "Audience_idProvinsi_fkey" FOREIGN KEY ("idProvinsi") REFERENCES "AreaProvinsi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audience" ADD CONSTRAINT "Audience_idKabkot_fkey" FOREIGN KEY ("idKabkot") REFERENCES "AreaKabkot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicConcernTrend" ADD CONSTRAINT "PublicConcernTrend_idProvinsi_fkey" FOREIGN KEY ("idProvinsi") REFERENCES "AreaProvinsi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicConcernTrend" ADD CONSTRAINT "PublicConcernTrend_idKabkot_fkey" FOREIGN KEY ("idKabkot") REFERENCES "AreaKabkot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderTraitAssessment" ADD CONSTRAINT "LeaderTraitAssessment_idProvinsi_fkey" FOREIGN KEY ("idProvinsi") REFERENCES "AreaProvinsi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderTraitAssessment" ADD CONSTRAINT "LeaderTraitAssessment_idKabkot_fkey" FOREIGN KEY ("idKabkot") REFERENCES "AreaKabkot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionHotIssues" ADD CONSTRAINT "RegionHotIssues_idProvinsi_fkey" FOREIGN KEY ("idProvinsi") REFERENCES "AreaProvinsi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionHotIssues" ADD CONSTRAINT "RegionHotIssues_idKabkot_fkey" FOREIGN KEY ("idKabkot") REFERENCES "AreaKabkot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swot" ADD CONSTRAINT "Swot_idCandidate_fkey" FOREIGN KEY ("idCandidate") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_idCandidate_fkey" FOREIGN KEY ("idCandidate") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MlAi" ADD CONSTRAINT "MlAi_idPaslon_fkey" FOREIGN KEY ("idPaslon") REFERENCES "Paslon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Effect" ADD CONSTRAINT "Effect_idCandidate_fkey" FOREIGN KEY ("idCandidate") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEmotion" ADD CONSTRAINT "CandidateEmotion_idProvinsi_fkey" FOREIGN KEY ("idProvinsi") REFERENCES "AreaProvinsi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEmotion" ADD CONSTRAINT "CandidateEmotion_idKabkot_fkey" FOREIGN KEY ("idKabkot") REFERENCES "AreaKabkot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEmotion" ADD CONSTRAINT "CandidateEmotion_idCandidate_fkey" FOREIGN KEY ("idCandidate") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaslonEmotion" ADD CONSTRAINT "PaslonEmotion_idProvinsi_fkey" FOREIGN KEY ("idProvinsi") REFERENCES "AreaProvinsi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaslonEmotion" ADD CONSTRAINT "PaslonEmotion_idKabkot_fkey" FOREIGN KEY ("idKabkot") REFERENCES "AreaKabkot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaslonEmotion" ADD CONSTRAINT "PaslonEmotion_idPaslon_fkey" FOREIGN KEY ("idPaslon") REFERENCES "Paslon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
