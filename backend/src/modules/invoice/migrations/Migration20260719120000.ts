import { Migration } from '@mikro-orm/migrations';

export class Migration20260719120000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "invoice" ("id" text not null, "order_id" text not null, "invoice_number" text not null, "sequence" integer not null, "fiscal_year" text not null, "pan_vat" text null, "issued_at" timestamptz not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "invoice_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_INVOICE_ORDER_ID" ON "invoice" (order_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_INVOICE_NUMBER" ON "invoice" (invoice_number) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_invoice_deleted_at" ON "invoice" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "invoice" cascade;`);
  }

}
