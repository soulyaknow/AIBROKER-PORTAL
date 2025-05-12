const supabaseJWTSecret = process.env.SUPABASE_JWT_SECRET;

exports.verifySupabaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Dynamically import `jose` (since it's ESM)
    const { jwtVerify } = await import("jose");

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(supabaseJWTSecret)
    );

    req.user = payload;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
};
