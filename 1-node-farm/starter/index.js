const fs    =   require("fs");
const http = require('http');
const url = require('url');
const slugify = require('slugify');
//Import Templates
const replaceTemplate = require('./modules/replaceTemplate');


///////////////////////////
//FILES
// console.time("dbsave");
// const textIn=fs.readFileSync('./txt/input.txt','utf-8');
// //console.log(textIn);

// const textOut= `This is what we know about avocade: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);

// console.log('File Written!');
// console.timeEnd("dbsave");


// console.time("dbsave");
// fs.readFile('./txt/start.txt','utf-8', (err,data1) => {
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err,data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8', (err,data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('Your file has been written 😊');
//                 console.timeEnd("dbsave");
//             });

            
//         });
//     });
// });
// console.log('Will read file');


//SERVER/////////////////////////////////////////////////

//readonce
const templateOverview= fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const templateCard= fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateProduct= fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data= fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);

// const slugs= dataObj.map(el => slugify(el.productName,{lower:true}));
// console.log(slugs);

//ROUTING
const server = http.createServer((req,res)=>{

    const {query,pathname} = url.parse(req.url,true);

    if(pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200,{'Content-type':'text/html'});

        const cardsHtml= dataObj.map(el => replaceTemplate(templateCard,el)).join('');
        const output = templateOverview.replace('{%PRODCT_CARDS%}',cardsHtml);
        res.end(output);
    }
    else if(pathname.startsWith('/product/'))
    {
        res.writeHead(200,{'Content-type':'text/html'});
        const productSlug = pathname.split('/').pop();
        const product = dataObj.find(obj => obj.slug === productSlug);
        if (product) {
            const output = replaceTemplate(templateProduct,product);
            res.end(output);
        }
        else {
            // If product data doesn't exist, render a 404 page
            res.end('<h1>404 Not Found</h1>');
        }
        
    }
    else if(pathname === '/api')
    {
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);
    }
    else
    {
        res.writeHead(404,{
           'Content-type':'text/html' ,
           'my-own-header':'hello-world'
        });
        res.end('<h1>Not found!</h1>');
    }
   
});


server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request on port 8K');
});
