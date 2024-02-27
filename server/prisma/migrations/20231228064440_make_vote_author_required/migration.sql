/*
  Warnings:

  - Made the column `authorId` on table `Vote` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_authorId_fkey";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
