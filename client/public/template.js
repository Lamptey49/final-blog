export default ({markup}, title) => {
  // let title =  title
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
      <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q0SB6LTE54"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Q0SB6LTE54');
        </script>
        <meta charset="utf-8" />
        <link rel="icon" href="/public/favicon.ico" type='image/png/ico'/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00ff00" />
        <meta
          name="description"
          content="blogging site for scopaf"
        />
        <meta property="og:title" content='Read exciting stories from here | ScopAf' />
        <meta
            property="og:description"
            content="Fascinating contents here, read our latest stories here"
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={https://scopaf.herokuapp.com} /> 
        <meta property="og:site_name" content={ScopAf} /> 
        <meta property="og:image" content='./public/logo192.png' />
        <meta property="og:image:secure_url" content='./public/logo192.png' />
        <meta property="og:image:type" content="image/png" />
        <link rel="apple-touch-icon" href="./public/logo192.png" />
        
        <link  href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
        <link  href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
       
        <title>${title}</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${markup}</div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        <script type="text/javascript" src="/dist/bundle.js"></script>
      </body>
    </html>`
}
