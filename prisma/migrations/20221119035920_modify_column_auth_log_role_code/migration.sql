-- DropForeignKey
ALTER TABLE "AuthLog" DROP CONSTRAINT "AuthLog_role_code_fkey";

-- AlterTable
ALTER TABLE "AuthLog" ALTER COLUMN "role_code" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AuthLog" ADD CONSTRAINT "AuthLog_role_code_fkey" FOREIGN KEY ("role_code") REFERENCES "Roles"("role_code") ON DELETE SET NULL ON UPDATE CASCADE;
