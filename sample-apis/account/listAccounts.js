export const listAllAccounts = asyncErrorHandler(async (req) => {
  let { skip, limit } = paginationValues(req.query);

  const data = await Account.findAndCountAll({
    where: { status: 0 },
    offset: skip,
    limit: limit,
    order: [['createdAt', 'DESC']],
  });

  return new Response("Accounts fetched", { count: data.count, data: data.rows, }, 200);
})