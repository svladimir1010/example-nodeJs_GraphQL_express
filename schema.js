const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

// (Example) Hardcoded data
const customers = [
    {
        id: "1",
        name: "John Doe",
        email: "jdoe@gmail.com",
        age: 35
    },
    {
        id: "2",
        name: "Bill Bad",
        email: "bbad@gmail.com",
        age: 95
    },
    {
        id: "3",
        name: "Stive Smit",
        email: "ssmit@gmail.com",
        age: 11
    },
    {
        id: "4",
        name: "Sara Konor",
        email: "skonor@gmail.com",
        age: 16
    }
];

// Custome Type
const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },

            resolve(parentValue, args) {
                for (let i = customers.length; i--; ) {
                    if (customers[i].id == args.id) {
                        return customers[i];
                    }
                }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
