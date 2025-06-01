export const createAccount = asyncErrorHandler(async (req) => {
  const { email, name, website } = req.body;
  const { error } = AccountBodyValidation(req.body);
  if (error) throw new Error(error.details.map(err => err.message.replace(/['"]/g, "")), 400);

  const existingAccount = await Account.findOne({
    where: { email, status: 0 },
  });
  if (existingAccount) throw new Error("An account with this email already exists", 409);

  const account = await Account.create({ email, name, website });
  console.log("account", account);
  return new Response("Account created successfully", null, 200);
})