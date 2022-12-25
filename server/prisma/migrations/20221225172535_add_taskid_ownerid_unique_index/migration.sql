/*
  Warnings:

  - A unique constraint covering the columns `[talkId,owner_id]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "votes_talkId_owner_id_key" ON "votes"("talkId", "owner_id");
