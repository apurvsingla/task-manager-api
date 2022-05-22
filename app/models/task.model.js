module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        type: Number,
        checked: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Task = mongoose.model("task", schema);
    return Task;
};