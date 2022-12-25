/*
  Warnings:

  - You are about to drop the column `score` on the `votes` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "votes" DROP COLUMN "score",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;
