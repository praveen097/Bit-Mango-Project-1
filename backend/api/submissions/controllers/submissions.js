'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
var nodemailer = require('nodemailer');
var handleBars = require('handlebars');
var fs = require('fs');
var path = require('path')
// var transporter = nodeMailer.createTransport({
//   service:'gmail',
//   auth:{
//     user:'',
//     pass:''
//   }
// });


module.exports = {
    async create(submission){
      var source = fs.readFileSync(path.join(__dirname, 'mail.hbs'), 'utf8');
      var template = handleBars.compile(source)
        let minPrice = 0;
        let maxPrice = 0;
        let answeredQuestions = submission.request.body.answeredQuestions;
        answeredQuestions.forEach(questions => {
            questions.options.forEach((option)=>{
                minPrice += option.minPrice;
                maxPrice += option.maxPrice;
            })
        });
        var mailOptions = {
          to:submission.request.body.email,
          subject:"Cost Estimator - Answered Questions",
          attachments: [{
            filename: 'logo.png',
              path: __dirname +'/logo.png',
             cid: 'imagename'
      }],
          html:template({companyName:submission.request.body.companyName,questions:answeredQuestions,lowerEstimate:minPrice,upperEstimate:maxPrice})
        }

      //   await transporter.sendMail(mailOptions,(error,info)=>{
      //     if (error) console.log(error);
      //     else{
      //       console.log("Email Sent "+info.response);
      //     }
      //   })
      //   let dataSubmitted = {
      //       email:submission.request.body.email,
      //       companyName:submission.request.body.companyName,
      //       lowerEstimate:minPrice,
      //       upperEstimate:maxPrice,
      //       answeredQuestions:answeredQuestions
      //   }
      //   await strapi.services.submissions.create(dataSubmitted);
      //   return ({lowerEstimate:minPrice,upperEstimate:maxPrice});

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    // Message object
    let message = {
        from: 'Sender Name <sender@example.com>',
        to: 'Recipient <recipient@example.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
  });
}
}
