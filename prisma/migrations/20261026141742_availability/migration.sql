/*
  Warnings:

  - Added the required column `availability` to the `technicians` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "technicians" ADD COLUMN     "availability" JSONB NOT NULL;
