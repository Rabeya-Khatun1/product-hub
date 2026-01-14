import { connect } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  const { id } = await context.params; 

  const itemsCollection = connect("items-collection");
  const item = await itemsCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!item) {
    return Response.json({ message: "Item not found" }, { status: 404 });
  }

  return Response.json(item);
}
