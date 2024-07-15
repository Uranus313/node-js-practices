const debug = require("debug")("app:DB");
const { required } = require("joi");
const mongoose = require("mongoose");
debug("data base 2222");
mongoose.connect("mongodb://localhost/playground").then(() => debug("connected")).catch(err => debug(err));

const bookSchema = new mongoose.Schema({
    name: {type: String,minlength: 3, maxlength: 255, required: true},
    category : {type: String,enum: ["digital","physical","audio"], required: true},
    author: String,
    tags: {
        type: Array,
        validate: {
            validator : (v) =>{
                return v && v.length > 0;
            },
            message: "books should have one or more tags"
        }
        
        //async validation
        // validate: {
        //     validator : (v) =>{
        //         return new Promise((resolve, reject) =>{
        //             setTimeout(()=>{
        //                 const result = v && v.length > 0;
        //                 resolve(result);
        //             },4000)
        //         })
                
        //     },
        //     message: "books should have one or more tags"
        // }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {type: Number, min: 5, max:280, required : function(){ return this.isPublished;}}
});
const Book = mongoose.model("Book",bookSchema);

async function saveBook(){
    const book1 = new Book({
        // name : "Percy Jackson",
        category : "k",
        author : "Rick Riordan",
        tags : [],
        isPublished : true
    });
    try {
        const result = await book1.save();
        debug(result);

    } catch (error) {
        debug(error);
    }
}
async function getBooks(){
    const books = await Book.find({author: "Talkin",isPublished: true})
    .limit(10)
    .sort({name : -1})
    .select({name : 1, author: 1, _id: 0});
    debug(books);
}
//query first update
async function updateBook(id){
    const book = await Book.findById(id);
    if (!book){
        return;
    }
    book.isPublished = true;
    book.author = "new Author";
    const result = await book.save();
    debug(result);
}

//update first update
async function updateBook2(id){
    const result = await Book.updateMany({_id : id},{$set : {
        author : 'first author',
        isPublished: false
    }})
    //or
    // const result = await Book.findByIdAndUpdate(id,{$set : {
    //     author : 'second author',
    //     isPublished: true
    // }},{new : true});
    debug(result);
}

async function deleteBook(id){
    const result = await Book.deleteMany({_id : id});
    debug(result);
}
saveBook(); 


// async function connectToDB(){
//     try {
//         await mongoose.connect("mongodb://localhost/playground");
//         debug("data base connected");
//     } catch (error) {
//         debug(error);
//     }
// }
// connectToDB();
debug("data base 2222");


