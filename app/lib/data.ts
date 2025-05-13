import { endOfWeek, startOfWeek, subWeeks } from "date-fns";
import prisma from "./prisma";

export const getAllUsers = async (q?: string, page?: number) => {
  const ITEM_PER_PAGE = 4;

  const [users, count] = await prisma.$transaction([
    prisma.user.findMany({
      where: {
        username: { contains: q, mode: "insensitive" },
      },
      skip: (page! - 1) * ITEM_PER_PAGE,
      take: ITEM_PER_PAGE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({
      where: {
        username: { contains: q, mode: "insensitive" },
      },
    }),
  ]);

  return { users, count };
};

export const getUserDetails = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return user;
};

export const getAllProducts = async (q?: string, page?: number) => {
  const ITEM_PER_PAGE = 4;

  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      where: {
        title: { contains: q, mode: "insensitive" },
      },
      skip: (page! - 1) * ITEM_PER_PAGE,
      take: ITEM_PER_PAGE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({
      where: {
        title: { contains: q, mode: "insensitive" },
      },
    }),
  ]);

  return { products, count };
};

export const getProductDetails = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return product;
};

export const addUser = async ({
  username,
  email,
  password,
  phone,
  address,
  isAdmin,
  isActive,
}: {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  isActive: boolean;
}) => {
  const checkUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (checkUser) throw new Error("username/email already exist");

  await prisma.user.create({
    data: { username, email, password, phone, address, isAdmin, isActive },
  });
};

type NewProduct = {
  id?: string;
  title: string;
  desc: string;
  price: number;
  stock: number;
  color: string;
  size: string;
  category: string;
};

export const addProduct = async ({
  title,
  desc,
  price,
  stock,
  color,
  size,
  category,
}: NewProduct) => {
  const checkProduct = await prisma.product.findFirst({
    where: {
      title,
    },
  });

  if (checkProduct) throw new Error("Title already exist");

  await prisma.product.create({
    data: { title, desc, price, stock, color, size, category },
  });
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });
};

export const updateUserDetails = async ({
  id,
  username,
  email,
  phone,
  address,
  isAdmin,
  isActive,
}: {
  id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  isActive: boolean;
}) => {
  await prisma.user.update({
    where: {
      id: parseInt(id!),
    },
    data: {
      username,
      email,
      phone,
      address,
      isAdmin,
      isActive,
    },
  });
};

export const updateProductDetails = async ({
  id,
  title,
  desc,
  price,
  stock,
  color,
  size,
  category,
}: NewProduct) => {
  await prisma.product.update({
    where: {
      id: parseInt(id!),
    },
    data: { title, desc, price, stock, color, size, category },
  });
};

export const fetchTotalUsers = async () => {
  const now = new Date();
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 });

  // Last week
  const startOfLastWeek = subWeeks(startOfThisWeek, 1);
  const endOfLastWeek = subWeeks(endOfThisWeek, 1);

  const [totalCount, thisWeekCount, pastWeekCount] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.count({
      where: {
        createdAt: {
          gte: startOfThisWeek,
          lte: endOfThisWeek,
        },
      },
    }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: startOfLastWeek,
          lte: endOfLastWeek,
        },
      },
    }),
  ]);

  const result =
    ((thisWeekCount - pastWeekCount) / (thisWeekCount + pastWeekCount)) * 100;
  return {
    totalCount,
    percentage: result,
  };
};

export const fetchTotalProducts = async () => {
  const now = new Date();
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 });

  // Last week
  const startOfLastWeek = subWeeks(startOfThisWeek, 1);
  const endOfLastWeek = subWeeks(endOfThisWeek, 1);

  const [totalCount, thisWeekCount, pastWeekCount] = await prisma.$transaction([
    prisma.product.count(),
    prisma.product.count({
      where: {
        createdAt: {
          gte: startOfThisWeek,
          lte: endOfThisWeek,
        },
      },
    }),
    prisma.product.count({
      where: {
        createdAt: {
          gte: startOfLastWeek,
          lte: endOfLastWeek,
        },
      },
    }),
  ]);

  const result =
    ((thisWeekCount - pastWeekCount) / (thisWeekCount + pastWeekCount)) * 100;
  return {
    totalCount,
    percentage: result,
  };
};

export const fetchWeeklyRecap = async () => {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const result = await prisma.$queryRawUnsafe<{ day: string; count: number }[]>(
    `
    SELECT
      TO_CHAR("createdAt", 'Dy') AS day,
      COUNT(*) AS count
    FROM "User"
    WHERE "createdAt" BETWEEN $1 AND $2
    GROUP BY day
    ORDER BY MIN(DATE_TRUNC('day', "createdAt"))
    `,
    weekStart,
    weekEnd
  );

  const result2 = await prisma.$queryRawUnsafe<
    { day: string; count: number }[]
  >(
    `
    SELECT
      TO_CHAR("createdAt", 'Dy') AS day,
      COUNT(*) AS count
    FROM "Product"
    WHERE "createdAt" BETWEEN $1 AND $2
    GROUP BY day
    ORDER BY MIN(DATE_TRUNC('day', "createdAt"))
    `,
    weekStart,
    weekEnd
  );

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const countsMap = Object.fromEntries(
    result.map(({ day, count }) => [day.trim(), Number(count)])
  );

  const countsMap2 = Object.fromEntries(
    result2.map(({ day, count }) => [day.trim(), Number(count)])
  );

  const normalized = weekDays.map((day) => ({
    day,
    userCount: countsMap[day] || 0,
    productCount: countsMap2[day] || 0,
  }));

  return normalized;
};

export const fetchMonthlyUserProduct = async () => {
  const result = await prisma.$queryRawUnsafe<
    { month: string; user_count: bigint; product_count: bigint }[]
  >(`
  WITH months AS (
    SELECT generate_series(1, 12) AS month_number
  ),
  user_counts AS (
    SELECT 
      EXTRACT(MONTH FROM "createdAt") AS month_number,
      COUNT(*) AS count
    FROM "User"
    GROUP BY month_number
  ),
  product_counts AS (
    SELECT 
      EXTRACT(MONTH FROM "createdAt") AS month_number,
      COUNT(*) AS count
    FROM "Product"
    GROUP BY month_number
  )
  SELECT 
    TO_CHAR(TO_DATE(m.month_number::text, 'MM'), 'FMMonth') AS month,
    COALESCE(u.count, 0) AS user_count,
    COALESCE(p.count, 0) AS product_count
  FROM months m
  LEFT JOIN user_counts u ON m.month_number = u.month_number
  LEFT JOIN product_counts p ON m.month_number = p.month_number
  ORDER BY m.month_number;
`);

  return result.map(({ month, product_count, user_count }) => ({
    month: month.trim(),
    product_count: Number(product_count),
    user_count: Number(user_count),
  }));
};

export const fetchProductCat = async () => {
  const result = await prisma.$queryRawUnsafe<
    { category: string; count: number }[]
  >(`
  SELECT
    category,
    COUNT(*)::int AS count
  FROM "Product"
  GROUP BY category
  ORDER BY count DESC
`);

  // const result = await prisma.product.groupBy({
  //   by: ['category'],
  //   _count: {
  //     category: true,
  //   },
  //   orderBy: {
  //     _count: {
  //       category: 'desc',
  //     },
  //   },
  // });

  return result;
};
