import { GraphQLServer } from "graphql-yoga"
import mongoose from "mongoose"

const connection = mongoose.connect('mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASS+'@'+process.env.MONGODB_URI)

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type:String},
    description: {type:String},
    image: {type:String},
    price: {type:Number}
}, {collection:"products"}); // Defining the collection is redundant in this case.

const products = mongoose.model('products', productSchema);

const typeDefs =
`type Product {
  _id: String
  name: String
  description: String
  image: String
  price: Float
}
type Query {
  product(_id: String): Product
  products: [Product]
}`

const resolvers = {
  Query: {
    product: async (_id) => {
      return (await products.findOne(_id))
    },
    products: async () => {
      return (await products.find({}))
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start({port: process.env.PORT})
console.log("[debugger] graphql is now running on http://localhost:"+process.env.PORT)
console.log('[debugger] mongodb connection is mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASS+'@'+process.env.MONGODB_URI)
