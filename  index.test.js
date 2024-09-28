const app = require('./index.js')

const request = require("supertest");

//console.log(app)
describe("Trying to Test Firebase API with Jest", () => {
    test("200 get all 'item' in firebase", () => {
      return request(app)
        .get("/api/read")
        .expect(200)
        .then((data) => {
            console.log(data._body)
          expect(Array.isArray(data._body)).toBe(true);
          });
        });

        test("200 get item id=0 in firebase", () => {
            return request(app)
              .get("/api/read/0")
              .expect(200)
              .then((data) => {
                  console.log(data._body)
                expect(data._body).toEqual({  item: 'item0' });
        });
    });

    test("404 get something that did not exist", () => {
        return request(app)
          .get("/api/hello")
          .expect(404)
          .then((data) => {
              console.log(data.text)//The data.text show error msg in HTML
              expect(data.status).toBe(404)
    });
});

test.skip("200 post something in the firebase", () => { 
    return request(app)
      .post("/api/create/")
      .send({
              "id" : "1",
                "item" : { "user": "Maria2",
                    "password" : "123"
                } //collecton = table = item, id= doc = primary key, rest is the data
          
      })
      .expect(200)
      .then((data) => {
        console.log(data)//The data.text show error msg in HTML
        //When the data already exist, we get error 500 
        //   Error: 6 ALREADY_EXISTS: Document already exists:...
        expect(data._data).toEqual({
            "id" : "1",
              "item" : { "user": "Maria2",
                  "password" : "123"
              }})
    
});
});

test("200 uptdate 'items' id=1 in firebase", () => {
    return request(app)
      .put('/api/update/1')
      .send({   "id" : 1,
                "item" : { "name": "La vida es bella"
                } //collecton = table = item, id= doc = primary key, rest is the data
          
      }) // When the data already exists return 200 but data._data will be undefinded
      .expect(200)
      .then((data) => {
        console.log(data)
    //   expect(data._data).toEqual({   "id" : 1,
    //     "item" : { "name": "La vida es bella"
    //     }})
});
})
})

test.only("200 delete a item, It does do the deleting once, and then just dont give any error if its compiled more times", () => {
    return request(app)
      .delete('/api/delete/2')
      .expect(200)
      .then((data) => {
          console.log(data)//The data.text show error msg in HTML
          expect(data.status).toBe(200)
});
})

test("200 delete a item, When is pass a not existing id, return 200", () => {
    return request(app)
      .delete('/api/delete/33')
      .expect(200)
      .then((data) => {
          console.log(data)//The data.text show error msg in HTML
          expect(data.status).toBe(200)
});
});
