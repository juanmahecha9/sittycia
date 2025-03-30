-- CreateTable
CREATE TABLE "todo_table" (
    "id" INTEGER NOT NULL,
    "task" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todo_table_pkey" PRIMARY KEY ("id")
);
