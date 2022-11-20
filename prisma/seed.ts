import * as bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
import { SALT_ROUND } from '../src/config/config';

const prisma = new PrismaClient();

async function users() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      username: 'admin',
      password: await bcrypt.hash('secretnumber', SALT_ROUND),
      created_at: String(new Date().valueOf()),
      is_active: true,
    },
  });

  const kepala_gudang = await prisma.user.upsert({
    where: { email: 'kepala_gudang@gmail.com' },
    update: {},
    create: {
      email: 'kepala_gudang@gmail.com',
      username: 'kepala gudang',
      password: await bcrypt.hash('secretnumber', SALT_ROUND),
      created_at: String(new Date().valueOf()),
      is_active: true,
    },
  });

  const operator_gudang = await prisma.user.upsert({
    where: { email: 'operator_gudang@gmail.com' },
    update: {},
    create: {
      email: 'operator_gudang@gmail.com',
      username: 'operator gudang',
      password: await bcrypt.hash('secretnumber', SALT_ROUND),
      created_at: String(new Date().valueOf()),
      is_active: true,
    },
  });

  const staff_pengadaan = await prisma.user.upsert({
    where: { email: 'staf_pengadaan@gmail.com' },
    update: {},
    create: {
      email: 'staff_pengadaan@gmail.com',
      username: 'staff pengadaan',
      password: await bcrypt.hash('secretnumber', SALT_ROUND),
      created_at: String(new Date().valueOf()),
      is_active: true,
    },
  });

  const customer_serrvice = await prisma.user.upsert({
    where: { email: 'customer_serrvice@gmail.com' },
    update: {},
    create: {
      email: 'customer_serrvice@gmail.com',
      username: 'customer service',
      password: await bcrypt.hash('secretnumber', SALT_ROUND),
      created_at: String(new Date().valueOf()),
      is_active: true,
    },
  });

  const cashier = await prisma.user.upsert({
    where: { email: 'cashier@gmail.com' },
    update: {},
    create: {
      email: 'cashier@gmail.com',
      username: 'cashier',
      password: await bcrypt.hash('secretnumber', SALT_ROUND),
      created_at: String(new Date().valueOf()),
      is_active: true,
    },
  });

  const quality_control = await prisma.user.upsert({
    where: { email: 'quality_control@gmail.com' },
    update: {},
    create: {
      email: 'quality_control@gmail.com',
      username: 'quality control',
      password: await bcrypt.hash('secretnumber', SALT_ROUND),
      created_at: String(new Date().valueOf()),
      is_active: true,
    },
  });

  /**
   * Roles section
   */
  const role_admin = await prisma.roles.upsert({
    where: { role_code: 'admin' },
    update: {},
    create: {
      role_code: 'admin',
      role_name: 'Admin',
      created_at: String(new Date().valueOf()),
      created_by: admin.user_id,
    },
  });
  const role_kepala_gudang = await prisma.roles.upsert({
    where: { role_code: 'KPL_GUDANG' },
    update: {},
    create: {
      role_code: 'KPL_GUDANG',
      role_name: 'Kepala Gudang',
      created_at: String(new Date().valueOf()),
      created_by: admin.user_id,
    },
  });
  const role_pengadaan = await prisma.roles.upsert({
    where: { role_code: 'STF_PENGADAAN' },
    update: {},
    create: {
      role_code: 'STF_PENGADAAN',
      role_name: 'Staff Pengadaan',
      created_at: String(new Date().valueOf()),
      created_by: admin.user_id,
    },
  });
  const role_customer_service = await prisma.roles.upsert({
    where: { role_code: 'CtS' },
    update: {},
    create: {
      role_code: 'CtS',
      role_name: 'Customer Service',
      created_at: String(new Date().valueOf()),
      created_by: admin.user_id,
    },
  });
  const role_cashier = await prisma.roles.upsert({
    where: { role_code: 'Csh' },
    update: {},
    create: {
      role_code: 'Csh',
      role_name: 'Cashier',
      created_at: String(new Date().valueOf()),
      created_by: admin.user_id,
    },
  });
  const role_quality_control = await prisma.roles.upsert({
    where: { role_code: 'QCT' },
    update: {},
    create: {
      role_code: 'QCT',
      role_name: 'Quality Control',
      created_at: String(new Date().valueOf()),
      created_by: admin.user_id,
    },
  });

  /**
   * Has Role Section
   */
  const has_role = await prisma.hasRole.createMany({
    data: [
      {
        user_id: admin.user_id,
        role_code: role_admin.role_code,
        created_at: String(new Date().valueOf()),
        created_by: admin.user_id,
      },
      {
        user_id: kepala_gudang.user_id,
        role_code: role_kepala_gudang.role_code,
        created_at: String(new Date().valueOf()),
        created_by: admin.user_id,
      },
      {
        user_id: staff_pengadaan.user_id,
        role_code: role_pengadaan.role_code,
        created_at: String(new Date().valueOf()),
        created_by: admin.user_id,
      },
      {
        user_id: customer_serrvice.user_id,
        role_code: role_customer_service.role_code,
        created_at: String(new Date().valueOf()),
        created_by: admin.user_id,
      },
      {
        user_id: cashier.user_id,
        role_code: role_cashier.role_code,
        created_at: String(new Date().valueOf()),
        created_by: admin.user_id,
      },
      {
        user_id: quality_control.user_id,
        role_code: role_quality_control.role_code,
        created_at: String(new Date().valueOf()),
        created_by: admin.user_id,
      },
    ],
  });

  return {
    user: {
      admin,
      kepala_gudang,
      operator_gudang,
      staff_pengadaan,
      customer_serrvice,
      cashier,
      quality_control,
    },
    roles: {
      role_admin,
      role_kepala_gudang,
      role_pengadaan,
      role_customer_service,
      role_cashier,
      role_quality_control,
    },
    has_role,
  };
}

async function main() {
  const user_seed = await users();
  console.log({ user_seed });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
