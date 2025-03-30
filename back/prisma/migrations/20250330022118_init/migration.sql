-- AlterTable
CREATE SEQUENCE todo_table_id_seq;
ALTER TABLE "todo_table" ALTER COLUMN "id" SET DEFAULT nextval('todo_table_id_seq');
ALTER SEQUENCE todo_table_id_seq OWNED BY "todo_table"."id";
