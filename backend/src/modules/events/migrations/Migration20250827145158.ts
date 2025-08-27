import { Migration } from '@mikro-orm/migrations';

export class Migration20250827145158 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "event" ("id" text not null, "name" text not null, "description" text not null, "image_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "event_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_event_deleted_at" ON "event" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "subscriber" ("id" text not null, "name" text not null, "email" text not null, "event_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "subscriber_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_subscriber_event_id" ON "subscriber" (event_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_subscriber_deleted_at" ON "subscriber" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "subscriber" add constraint "subscriber_event_id_foreign" foreign key ("event_id") references "event" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "subscriber" drop constraint if exists "subscriber_event_id_foreign";`);

    this.addSql(`drop table if exists "event" cascade;`);

    this.addSql(`drop table if exists "subscriber" cascade;`);
  }

}
