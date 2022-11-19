-- AddForeignKey
ALTER TABLE "HasRole" ADD CONSTRAINT "HasRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
