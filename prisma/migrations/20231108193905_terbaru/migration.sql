/*
  Warnings:

  - Added the required column `timeEmotion` to the `PaslonEmotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidateEmotion" ADD COLUMN     "timeEmotion" TIME;

-- AlterTable
ALTER TABLE "PaslonEmotion" ADD COLUMN     "timeEmotion" TIME NOT NULL;

-- CreateTable
CREATE TABLE "PaslonPopularity" (
    "id" TEXT NOT NULL,
    "idPaslon" INTEGER NOT NULL,
    "dateEmotion" DATE NOT NULL,
    "timeEmotion" TIME,
    "rate" DOUBLE PRECISION NOT NULL,
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

    CONSTRAINT "PaslonPopularity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaslonPopularity" ADD CONSTRAINT "PaslonPopularity_idPaslon_fkey" FOREIGN KEY ("idPaslon") REFERENCES "Paslon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
