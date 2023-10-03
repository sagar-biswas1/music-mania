const { ObjectId } = require("mongodb");
const Song = require("../../models/Song");

const findByID = async ({ id, expand = "" }) => {
    if (!ObjectId.isValid(id)) {
      throw new Error(`You have passed invalid id ${id}`);
    }
    
    const itemToPopulate = expand.split(",").map((item) => item.trim());
    const song = await Song.findById(id);
    if (!song) {
      throw notFound();
    }
    if (itemToPopulate.includes("uploadedBy")) {
      await song.populate({ path: "uploadedBy", select: "name" });
    }
  
   
  
    return song._doc;
  };

  module.exports= findByID