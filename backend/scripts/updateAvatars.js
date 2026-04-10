import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const updateAvatars = async () => {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    for (const user of users) {
        const bg = user.gender === "male" ? "b6e3f4" : "ffdfbf";
        const newPic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}&backgroundColor=${bg}`;
        await User.updateOne({ _id: user._id }, { profilePic: newPic });
        console.log(`Updated: ${user.fullName} -> ${newPic}`);
    }

    console.log("Done!");
    await mongoose.disconnect();
};

updateAvatars().catch(console.error);
