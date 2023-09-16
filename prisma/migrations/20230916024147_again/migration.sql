/*
  Warnings:

  - The primary key for the `OrderedBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderedBook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookId,orderId]` on the table `OrderedBook` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "OrderedBook_bookId_orderId_key" ON "OrderedBook"("bookId", "orderId");
