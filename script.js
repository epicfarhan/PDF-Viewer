const url = 'UNIX and Linux System Administration Handbook ( PDFDrive ).pdf'; // file name or path to file including filename e.g dir/filename
let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    PageIsPending = null;

const scale = 1.5,
    canvas = document.querySelector('#pdf-render');
    ctx = canvas.getContext('2d');

    const renderPage = num =>{
      pageIsRendering = true;
      
      // get page
      pdfDoc.getPage(num).then(page => {
         // get scale
        const viewport = page.getViewport({scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderCtx = {
         canvasContext : ctx,
         viewport
        }

        page.render(renderCtx).promise.then(() => {
          pageIsRendering = false;

          if (PageIsPending !== null) {
               renderPage(PageIsPending);
               PageIsPending = null;
               console.log("Hello");
          }
        });

        //output current page
        document.querySelector('#page-num').textContent = num;
      });
    };

// check for pages rendering

const queueRenderPage = num =>{
   if (pageIsRendering) {
      pageIsRendering = num;
   }else{
      renderPage(num);
   }
}

// Show prev page

const showPrevPage = () => {
   if(pageNum <= 1){
      return;
      
   }
   pageNum--;
   queueRenderPage(pageNum);
}


// Show next page

const showNextPage = () => {
   if(pageNum >= pdfDoc.numPages){
      return;
   }
   pageNum++;
   queueRenderPage(pageNum);
}
  
// Get Document 
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_
    
    document.querySelector('#page-count').textContent = pdfDoc.numPages;
    renderPage(pageNum);
});

// Button events
 document.querySelector('#prev-page').addEventListener('click', showPrevPage);
 document.querySelector('#next-page').addEventListener('click', showNextPage);




 /* onload page (start) */

 var loader = document.querySelector('.loader');
 var pageNUm =  document.querySelector('.page-info');
 
if (pageNum != 0) {
   setTimeout(() => {
      loader.style.display = "none";
   }, 2000);
}

 /* onload page (end) */