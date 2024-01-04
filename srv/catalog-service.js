const cds = require('@sap/cds'); 

module.exports = cds.service.impl(async function () { 
    const { 
        Books,
        BusinessPartners
    } = this.entities; 
    

    // connect to remote service
    const BPsrv = await cds.connect.to("API_BUSINESS_PARTNER");

    /**
     * Event-handler for read-events on the BusinessPartners entity.
     * Each request to the API Business Hub requires the apikey in the header.
     */
this.on("READ", BusinessPartners, async (req) => {
        // The API Sandbox returns alot of business partners with empty names.
        // We don't want them in our application
        req.query.where("LastName <> '' and FirstName <> '' ");

        return await BPsrv.transaction(req).send({
            query: req.query,
            headers: {
                apikey: process.env.apikey,
            },
        });
    });
this.after('READ', Books, (books, req) => {
        console.log('Response Headers:', req.headers);
      });



// this.on('getBook', async(req)=>{
//     var getID = req.data.ID;
//     var getBookInfo = await cds.run(cds.parse.cql("SELECT * FROM my.bookshop.Books WHERE ID=" + getID ));
//     var BookNames = getBookInfo[0].title;
//     var output = {
//         "BookName": BookNames 
//     };
//     return output;
// });
// this.before('CREATE', Books,  async(data, req) => {
    // if (!data.value) {
    //     data.value = [];
    //   }

    //   const extraData = {
    //     "ID": 3,
    //     "title": "New Book",
    //     "stock": 200,
    //     // "newtitle": "3 New Book"
    //   };
    // //   return extraData;
    //   data.value.push(extraData);
    //   console.log("New data is ",extraData );
    //   return extraData;
    // const extraData = {
    //     ID: 3,
    //     title: 'New Book',
    //     stock: 200,
    //     newtitle: '3 New Book'
    //   };

    //   await srv.tx(async (tx) => {
       
    //     const existingData = await tx.run(SELECT.from(Books));

    //     const newData = [...existingData, extraData];
  
    //     await tx.run(INSERT.into(Books).entries(newData));
    //   });
  
    //   // Rollback or commit is handled automatically by the framework
    // });
 
// this.on('CREATE', Books, async(req) => {
//         // const { data } = req;

//         // const newData = {
//         //   ID: 4,
//         //   title: ' Book 4',
//         //   stock: 500,
         
//         // };
//         // data.value[data.value.length] = newData;
    
//         // console.log('New Data:', newData);
//         // console.log('Data created successfully');
//         const { ID, title, stock } = req.data;

//         await cds.tx(req).run(
//           INSERT.into('Books').entries({
//             ID: 3,
//             title: 'subha',
//             stock: 600
//           })
//         );
    
//         // Continue with the regular CREATE operation logic
//         return req.data;
// });
   

// // this.on('CREATE', 'Books', async (req) => {
// //     // Your actual create logic goes here
// //     // It will be executed after the before hook
// //     const result = await cds.transaction(req).run(req.query);

// //     return result;
// //   });
});

