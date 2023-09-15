/*
  Warnings:

  - You are about to drop the column `passwor` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwor",
ADD COLUMN     "password" TEXT;
