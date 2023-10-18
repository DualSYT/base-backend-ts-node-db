import mongoose, { Schema, model } from 'mongoose'

let ejemploSchema = new Schema(
    {
        id: { type: Number },
    },
    {
        versionKey: false,
        _id: false
    }
);

const ejemplo = mongoose.model('ejemplo-model', ejemploSchema);

export default ejemplo