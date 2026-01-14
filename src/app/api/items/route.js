import { connect } from "@/app/lib/dbConnect";


export async function GET(request){
    const itemsCollection = connect("items-collection");
    const result = await itemsCollection.find().toArray()
    return Response.json(result);
}