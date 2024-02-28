import { prisma } from "@/lib/prisma"
import * as columns from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { models } from "@/lib/admin";

export async function generateStaticParams() {
  return models.map((model) => {
    return { model: model }
  });
}

export default async function AdminPage({ params } : { params: { model: "user" } }) {
  const { model } = params;
  const rows = await prisma[model].findMany();

  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <DataTable 
        data={rows}
        columns={columns[model]}
        />
    </RoleGate>
  )
}