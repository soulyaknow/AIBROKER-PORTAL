const { supabase } = require("../middleware/supabaseClient");

exports.signup = async (req, res) => {
  const { email, password, fullName, contactNumber, companyName } = req.body;

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

    if (error) {
      console.error("Supabase createUser error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const userId = data.user?.id;
    if (!userId) {
      console.error("User ID missing after signup.");
      return res.status(500).json({ error: "User ID missing after signup" });
    }

    const { error: profileError } = await supabase.from("Profiles").insert({
      user_id: userId,
      company_name: companyName,
      contact_number: contactNumber,
    });

    if (profileError) {
      console.error("Profile insert error:", profileError.message);
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(200).json({
      message: "Signup successful. You may now log in.",
    });
  } catch (err) {
    console.error("Unhandled signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Signin error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    if (data?.session?.access_token) {
      return res.status(200).json({
        message: "Signin successful",
        access_token: data.session.access_token,
        user: data.user,
      });
    } else {
      throw new Error("No access token found.");
    }
  } catch (err) {
    console.error("Unhandled signin error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.users = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid token format" });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user)
      return res.status(403).json({ error: "Invalid token" });

    const user = data.user;

    const { data: profileData, error: profileError } = await supabase
      .from("Profiles")
      .select("images, username, account_type")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Profiles table error:", profileError.message);
    }

    const profileFromMetadata = user.user_metadata?.profile || null;

    res.json({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || "",
      profile_image: profileData?.images || profileFromMetadata || null,
      username: profileData?.username || null,
      account_type: profileData?.account_type || null,
      created_at: user.created_at,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching user metadata" });
  }
};

exports.edit = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const { data: userData, error: authError } = await supabase.auth.getUser(
      token
    );
    if (authError || !userData.user) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const user = userData.user;
    const userId = user.id;
    const { name, email, username, account_type } = req.body;

    // Update Supabase Auth
    const { error: updateUserError } = await supabase.auth.updateUser({
      data: { name },
      email,
    });
    if (updateUserError) {
      return res.status(500).json({ error: "Failed to update user in auth" });
    }

    // Check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from("Profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error checking profile existence:", fetchError);
      return res.status(500).json({ error: "Failed to fetch profile" });
    }

    if (existingProfile) {
      // Profile exists: update
      const { error: updateError } = await supabase
        .from("Profiles")
        .update({ username, account_type })
        .eq("user_id", userId);

      if (updateError) {
        console.error("Update failed:", updateError);
        return res.status(500).json({ error: "Failed to update profile" });
      }
    } else {
      // Profile doesn't exist: insert
      const { error: insertError } = await supabase
        .from("Profiles")
        .insert([{ user_id: userId, username, account_type }]);

      if (insertError) {
        console.error("Insert failed:", insertError);
        return res.status(500).json({ error: "Failed to create profile" });
      }
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Unhandled error:", err);
    return res.status(500).json({ error: "Server error editing profile" });
  }
};
