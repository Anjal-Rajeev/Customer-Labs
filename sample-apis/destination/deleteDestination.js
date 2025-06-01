export const deleteDestination = asyncErrorHandler(async (req) => {
  const { id } = req.params;

  const destination = await Destination.findOne({ where: { id, status: 0 } });

  if (!destination) {
    throw new Error("Destination not found or already deleted", 404);
  }

  // Soft deleting destination
  await destination.update({ status: 1 });

  return new Response("Destination deleted successfully", null, 200);
});
