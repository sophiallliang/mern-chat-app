import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config({ path: "../.env" });

const updateAvatars = async () => {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    for (const user of users) {
        const bg = user.gender === "male" ? "0ea5e9" : "f472b6";
        const newPic = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=${bg}&color=fff&rounded=true`;
        await User.updateOne({ _id: user._id }, { profilePic: newPic });
        console.log(`Updated: ${user.fullName} -> ${newPic}`);
    }

    console.log("Done!");
    await mongoose.disconnect();
};

updateAvatars().catch(console.error);
