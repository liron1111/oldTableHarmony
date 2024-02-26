import { prisma } from "@/model/prisma";
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache";
import authConfig from "../../lib/authConfig";
import Header from "../../components/header";
import Table from "../../components/table";
import * as columns from "../../lib/columns";

export async function generateStaticParams() {
  const models = prisma.models();

  return models.map((model) => {
    return { model: model }
  });
}

export default async function AdminPage({ params }) {
  const session = await getServerSession(authConfig);
  if (!session || session?.user?.accessKey <= 1) {
    throw new Error("User must be logged && admin to access Admin page");
  }

  const { model } = params; 
  const rows = await prisma[model].findMany();

  const updateRow = async (row) => {
    "use server"
    try {
      const { id, ...updatedData } = row;
      const updatedRow = await prisma[model].update({
        where: { id: row.id, },
        data: updatedData, 
      });
      revalidatePath("rows");
      return updatedRow;
    } catch (error) {
      return {
        error: true,
      }
    }
  };

  const deleteRow = async (rowId) => {
    "use server"
    try {
      const deletedRow = await prisma[model].delete({
        where: { id: rowId, }
      });
      revalidatePath("rows");
      return deletedRow;
    } catch (error) {
      return {
        error: true
      };
    }
  };

  return (
    <>
      <Header title="ADMIN" subtitle={`Management ${model}`} />
      <Table 
        rows={rows}
        columns={columns[model]}
        updateRow={updateRow}
        deleteRow={deleteRow}
      />
    </>
  )
}
