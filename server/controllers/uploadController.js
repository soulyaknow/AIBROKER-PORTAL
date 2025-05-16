const { supabase } = require("../middleware/supabaseClient");

exports.upload = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const { data, error } = await supabase.auth.getUser(token);
    const { user } = data;
    if (error || !user) return res.status(403).json({ error: "Invalid token" });

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const storagePath = `avatars/${user.id}/profile.jpg`;

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("avatars")
      .upload(storagePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return res.status(500).json({ error: uploadError.message });
    }

    console.log("Upload succeeded:", uploadData);

    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("avatars")
      .getPublicUrl(storagePath);

    if (urlError) {
      console.error("Supabase getPublicUrl error:", urlError);
      return res.status(500).json({ error: urlError.message });
    }

    const publicUrl = publicUrlData.publicUrl;

    console.log("Public URL:", publicUrl);

    const { error: dbError } = await supabase
      .from("Profiles")
      .update({ images: publicUrl })
      .eq("user_id", user.id);

    if (dbError) {
      console.error("Profiles table update error:", dbError);
      return res.status(500).json({ error: "Failed to update profile image." });
    }

    const { error: metaError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        user_metadata: {
          ...user.user_metadata,
          profile: publicUrl,
        },
      }
    );

    if (metaError) {
      console.error("User metadata update error:", metaError);
      return res.status(500).json({ error: "Failed to update user metadata." });
    }

    return res.json({
      url: publicUrl,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Server error during upload." });
  }
};
