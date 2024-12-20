-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_authorId_fkey";

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
