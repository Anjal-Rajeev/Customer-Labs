export const getDesignationsByAccount = asyncErrorHandler(async (req) => {
  let { skip, limit } = paginationValues(req.query)
  let { accountId } = req.query
  if (!accountId) throw new Error("Please select an Account", 400);

  const data = await Destination.findAndCountAll({
    where: { status: 0, AccountId: accountId },
    offset: skip,
    limit: limit,
    order: [['createdAt', 'DESC']]
  });

  return new Response('Destinations fetched successfully', { count: data.count, data: data.rows, }, 200);
})