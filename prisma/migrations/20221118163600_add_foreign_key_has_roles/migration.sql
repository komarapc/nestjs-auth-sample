-- AddForeignKey
ALTER TABLE "HasRole" ADD CONSTRAINT "HasRole_role_code_fkey" FOREIGN KEY ("role_code") REFERENCES "Roles"("role_code") ON DELETE RESTRICT ON UPDATE CASCADE;
