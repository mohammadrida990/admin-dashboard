/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const newUserCount = await prisma.user.count({
      where: {
        isRead: false,
      },
    });

    const newProductCount = await prisma.product.count({
      where: {
        isRead: false,
      },
    });

    const res = newProductCount + newUserCount;

    return new Response(JSON.stringify({ newCount: res || 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch new notifications" }),
      {
        status: 500,
      }
    );
  }
}
