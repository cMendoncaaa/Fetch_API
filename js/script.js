const url = "https://jsonplaceholder.typicode.com/posts";

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container");

const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const BodyInput = document.querySelector("#body");



// Ger id from url
const urlParams = new URLSearchParams(window.location.search);
const postid = urlParams.get("id");

// get all posts
async function getAllPosts() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    loadingElement.classList.add("hide");

    data.map((post) => {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");
        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Leia mais";
        link.setAttribute("href", `/post.html?id=${post.id}`);
        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);
        postsContainer.appendChild(div);
    });
}

// Get individual post
async function getPost(id) {
    const [responsePost, responseComments ] = await Promise.all([
        fetch(`${url}/${id}`), // posts/1´`),	
        fetch(`${url}/${id}/comments`) // posts/1´`),	
    ]);

    const dataPost = await responsePost.json();
    const dataComments = await responseComments.json();

    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.innerText = dataPost.title; 
    body.innerText = dataPost.body;

    postContainer.appendChild(title);
    postContainer.appendChild(body);
   

    dataComments.map((comment) => {
        createComment(comment);
    });
}

function createComment(comment) {
    const div = document.createElement("div");
    const email = document.createElement("h3");
    const commentbody = document.createElement("p");
    email.innerText = comment.email;
    body.innerText = comment.body;
    div.appendChild(email);
    div.appendChild(body);
    commentsContainer.appendChild(div);
}

//Post a comment 
async function postComment(comment) {
    const response = await fetch(`${url}/${postid}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();

    createComment(data);

}
if(!postid) {
    getAllPosts();
}else {
    getPost(postid);

    //Add event to comment form
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let comment = {
            email: emailInput.value,
            body: BodyInput.value   
        };
       comment.json.stringify(comment);

       postComment(comment);
    });

}
