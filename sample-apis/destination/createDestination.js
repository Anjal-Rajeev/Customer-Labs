// API - POST - /destination 
// body - {
//     "url": "http://localhost:3000/account",
//     "httpMethod": "GET",
//     "accountId": 1,
//     "headers": {
//         "APP_SECRET": "test secret",
//         "ACTION": "user.update",
//         "Content-Type": "application/json",
//         "Accept": "*"
//     }
// }


export const createDestination = asyncErrorHandler(async (req) => {
  const { accountId, url, httpMethod, headers } = req.body;

  const { error } = DestinationBodyValidation(req.body);
  if (error) throw new Error(error.details.map(err => err.message.replace(/['"]/g, '')).join(', '), 400);

  // Check if account exists
  const account = await Account.findOne({ where: { id: accountId, status: 0 } });
  if (!account) throw new Error('Account not found', 404);

  // Create destination
  const destination = await Destination.create({ AccountId: accountId, url, httpMethod, headers });
  console.log(destination);

  return new Response('Destination created successfully', null, 201);
});