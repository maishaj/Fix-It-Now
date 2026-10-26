/*
  Warnings:

  - You are about to drop the column `AverageRating` on the `technicians` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "technicians" DROP COLUMN "AverageRating",
ADD COLUMN     "averageRating" DECIMAL(3,2) NOT NULL DEFAULT 0;
