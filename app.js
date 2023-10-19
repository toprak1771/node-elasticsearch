const elasticSearch = require("elasticsearch");

const client = new elasticSearch.Client({
  host: "localhost:9200",
  pingTimeout: 3000,
});

const DATA = [
  {
    id: 1,
    name: "Mauro",
    surname: "Icardi",
    age: 30,
    nationality: "Argentina",
  },
  {
    id: 2,
    name: "Wilfried",
    surname: "Zaha",
    age: 30,
    nationality: "Ivory Coast",
  },
  {
    id: 3,
    name: "Davinson",
    surname: "Sacnhez",
    age: 28,
    nationality: "Colombia",
  },
  {
    id: 4,
    name: "Tanguy",
    surname: "Ndombele",
    age: 26,
    nationality: "France",
  },
  {
    id: 5,
    name: "Abdülkerim",
    surname: "Bardakçı",
    age: 29,
    nationality: "Turkey",
  },
  {
    id: 6,
    name: "Fernando",
    surname: "Muslera",
    age: 37,
    nationality: "Uruguay",
  },
];

client.ping({}, async function (error) {
  if (error) {
    console.log("error:", error);
  } else {
    console.log("connected");
    //index
    //const index = await onCreateIndes("teams");

    //mapping
    // const mapping = await client.indices.putMapping({
    //   index: "teams",
    //   body: {
    //     properties: {
    //       name: {
    //         type: "text",
    //       },
    //       surname: {
    //         type: "text",
    //       },
    //       age: {
    //         type: "integer",
    //       },
    //       nationality: {
    //         type: "text",
    //       },
    //     },
    //   },
    //   includeTypeName: true,
    //   type: "team",
    // });
    //console.log("mapping:", mapping);

    //creat docs
    // DATA.forEach(async (item, index) => {
    //   const createdResult = await client.index({
    //     index: "teams",
    //     type: "team",
    //     id: index + 100,
    //     body: item,
    //   });
    //   console.log("createdResult:", createdResult);
    // });

    //query search get read
    // const { hits } = await client.search({
    //   index: "customers",
    //   type: "search",
    //   body: {
    //     // query: {
    //     //   match: {
    //     //     name: "Fernando",
    //     //   },
    //     //   range: {
    //     //     age: {
    //     //       gte: 35,
    //     //       lte: 40,
    //     //     },
    //     //   },
    //     //   //   //  match:{
    //     //   //   //   name:'fernando'
    //     //   //   //  }
    //     //   //     // range:{
    //     //   //     //   age:{
    //     //   //     //     gte:35,
    //     //   //     //     lte:40
    //     //   //     //   }
    //     //   //     // }
    //     //   //     // term:{
    //     //   //     //   name:'fernando'
    //     //   //     // }
    //     //   //     // bool:{
    //     //   //     //   should:[
    //     //   //     //     {match:{name:'tanguy'}}
    //     //   //     //   ],
    //     //   //     //   filter:[
    //     //   //     //     {
    //     //   //     //       range:{
    //     //   //     //         age:{
    //     //   //     //           gte:25,
    //     //   //     //           lte:32
    //     //   //     //         }
    //     //   //     //       }
    //     //   //     //     }
    //     //   //     //   ]
    //     //   //     // }
    //     // },
    //     query: {
    //       range: {
    //         age: {
    //           gte: 20,
    //           lte: 30,
    //         },
    //       },
    //     },
    //     sort:[
    //       {
    //         age:{order:'desc'}
    //       }
    //     ]
    //   },
    // });
    const { hits } = await client.search({
      index: "teams",
      body: {
        query: {
          // range: {
          //   age: {
          //     gte: 20,
          //     lte: 30,
          //   },
          // },
          // ids:{
          //   values:[102,103]
          // }
          // wildcard:{
          //    name:{
          //      value:"fer*"
          //    }
          //   // name:{
          //   //   value:"fern?ndo"
          //   // }
          // }
          prefix:{
            name:{
              value:"fer"
            }
          }
        },
        // sort: [
        //   {
        //     age: { order: 'asc' }
        //   }
        // ],
        // size:2,
        // from:1
      },
    });
    console.log("object:", hits.hits);
  }
});

const onCreateIndes = async (index) => {
  try {
    return await client.indices.get({ index: index });
  } catch (error) {
    return await client.indices.create({ index: index });
  }
};
