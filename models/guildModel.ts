import mongoose, { Model, Schema } from "mongoose";

interface IGuild extends Document {
    tag: String;
    validationKey: String;
}

const guildSchema: Schema<IGuild> = new Schema({
    tag: { type: String, required: true },
    validationKey: { type: String, required: true },
});

const GuildModel: Model<IGuild> = mongoose.model("Guild", guildSchema);

export default GuildModel;
