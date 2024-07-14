const debug = require("debug")("app:DB");
const mongoose = require("mongoose");
debug("data base 2222");
mongoose.connect("mongodb://localhost/playground").then(() => debug("connected")).catch(err => debug(err));

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});
const Book = mongoose.model("Book",bookSchema);

async function saveBook(){
    const book1 = new Book({
        name : "Percy Jackson",
        author : "Rick Riordan",
        tags : ["Adventure","Mythology"],
        isPublished : true
    });
    const result = await book1.save();
    debug(result);
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
// deleteBook('6693b2fa98ff84d8f0b15ad6');


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


