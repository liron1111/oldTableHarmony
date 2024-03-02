import { prisma } from "@/lib/prisma"
import * as columns from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { models } from "@/lib/admin";

interface AdminPageProps {
  params: {
    model: "user",
  }
}

export async function generateStaticParams() {
  return models.map((model) => {
    return { model: model }
  });
}

export default async function AdminPage({ 
  params
} : AdminPageProps) {
  const { model } = params;
  const rows = await prisma[model].findMany();

  return (
    <div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <DataTable 
          data={rows}
          columns={columns[model]}
          />
      </RoleGate>
    </div>
  )
}