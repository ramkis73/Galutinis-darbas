module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          fullName: String,
          email: String,
          birthDate: Date
        },
        { timestamps: true }
    );


    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Dalyvis = mongoose.model("dalyviai", schema);
    return Dalyvis;
  };