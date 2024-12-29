import mongoose, { Model, Schema } from "mongoose";

interface IGuild {
    validationKey: string;
    wynnGuildId: string;
    wynnGuildName: string;
}

const userSchema: Schema<IGuild> = new Schema({
    validationKey: { type: String, required: true },
    wynnGuildId: { type: String, required: true },
    wynnGuildName: { type: String, required: true },
});

const NewGuildModel: Model<IGuild> = mongoose.connection.useDb("main").model("ValidationKey", userSchema);

export default NewGuildModel;
