// API - GET - /destination


export const listDestinations = asyncErrorHandler(async (req) => {
  let { skip, limit } = paginationValues(req.query)

  const data = await Destination.findAndCountAll({
    where: { status: 0 },
    offset: skip,
    limit: limit,
    include: [{
      model: Account,
      attributes: ['name', 'email', 'AccountId', 'id'],
      where: { status: 0 },
      required: true
    }],
    order: [['createdAt', 'DESC']]
  });

  return new Response('Destinations fetched successfully', { count: data.count, data: data.rows, }, 200);
});