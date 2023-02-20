const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "gdjh47rniof87gfjdnHJTUGNDIRNE04UFNew4r7fnmbHI8rj0hygf",
     mongoUri: 'mongodb://localhost:27017/scopaf_blog-db'
    // mongoUri:"mongodb+srv://Phinehas:Phinehas86@cluster0.1gctm.mongodb.net/kiriikou-ecommerce?retryWrites=true&w=majority",
    
    // sendgrid_api_key:'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',
    // email_address:'info@kiriikou.com',
    // SENDGRID_USERNAME:'lampteyphinehas70@gmail.com',
    // SENDGRID_PASSWORD:'phinehaslamptey86'*/
  }
  
  export default config