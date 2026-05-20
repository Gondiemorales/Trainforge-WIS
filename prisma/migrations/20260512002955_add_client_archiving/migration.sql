-- AlterTable
ALTER TABLE "ClientProfile" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "ClientProfile_isArchived_idx" ON "ClientProfile"("isArchived");
