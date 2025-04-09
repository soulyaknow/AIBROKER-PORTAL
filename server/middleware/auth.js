const jwt = require("jsonwebtoken");

exports.sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      full_name: user.fullname,
      email: user.email,
      contact_number: user.contactnumber,
      company_name: user.companyname,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.status(statusCode).json({
    success: true,
    token,
  });
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded; // This will have { user_id, store_id, ...other info }

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
