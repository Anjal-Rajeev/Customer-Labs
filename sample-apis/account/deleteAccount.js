// API - DELETE - /account/:id
// Params - id

export const deleteAccount = asyncErrorHandler(async (req) => {
  const { id } = req.params;

  const account = await Account.findOne({ where: { id, status: 0 } });

  if (!account) {
    throw new Error("Account not found or already deleted", 404);
  }

  // Soft deleting account
  await account.update({ status: 1 });

  // Soft deleting all associated destinations
  await Destination.update(
    { status: 1 },
    { where: { AccountId: id, status: 0 } }
  );

  return new Response("Account deleted successfully", null, 200);
});