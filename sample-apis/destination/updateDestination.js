export const updateDestination = asyncErrorHandler(async (req) => {
  const { id, accountId, url, httpMethod, headers } = req.body;

  const { error } = DestinationBodyValidation(req.body);
  if (error) throw new Error(error.details.map(err => err.message.replace(/['"]/g, '')).join(', '), 400);

  // Check if account is valid
  const account = await Account.findOne({ where: { id: accountId, status: 0 } });
  if (!account) throw new Error('Account not found', 404);

  // Find destination
  const destination = await Destination.findOne({ where: { id, AccountId: accountId, status: 0 } });
  if (!destination) throw new Error('Destination not found', 404);

  destination.url = url;
  destination.httpMethod = httpMethod;
  destination.headers = headers;

  await destination.save();

  return new Response('Destination updated successfully', null, 200);
});