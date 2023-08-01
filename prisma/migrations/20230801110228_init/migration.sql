-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "password" TEXT,
    "timeAlive" TIMESTAMP(3),
    "clickCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_code_key" ON "Links"("code");
