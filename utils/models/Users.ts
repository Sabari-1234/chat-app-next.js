import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    email: "String",
    name: "string",
    image: "string"
})
// const User = models?.User || model("User", userSchema);
// export default User;

const User = models?.User || model("User", userSchema)

export default User