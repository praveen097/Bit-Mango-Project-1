'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
var nodeMailer = require('nodemailer');
var transporter = nodeMailer.createTransport({
  service:'gmail',
  auth:{
    user:'',
    pass:""
  }
});


module.exports = {
    async create(submission){
        let minPrice = 0;
        let maxPrice = 0;
        let mailBody = "Hi " + submission.request.body.companyName+"\n\n Greetings from Bit Mango\nHere are the Questions you answered\n\n";
        let answeredQuestions = submission.request.body.answeredQuestions;
        answeredQuestions.forEach(questions => {
            mailBody+=questions.questionText+"\n";
            questions.options.forEach((option)=>{
                minPrice += option.minPrice;
                maxPrice += option.maxPrice
                mailBody+= option.optionText+" ";
            })
            mailBody+="\n\n"
        });
        mailBody+='\n\n The Lower Estimate of your project is:'+minPrice+"\n\n The Higher Estimate of your project is :"+maxPrice;
        var mailOptions = {
          to:submission.request.body.email,
          subject:"Cost Estimator - Answered Questions",
          text:mailBody
        }

        transporter.sendMail(mailOptions,(error,info)=>{
          if (error) console.log(error);
          else{
            console.log("Email Sent "+info.response);
          }
        })
        let dataSubmitted = {
            email:submission.request.body.email,
            companyName:submission.request.body.companyName,
            lowerEstimate:minPrice,
            upperEstimate:maxPrice,
            answeredQuestions:answeredQuestions
        }
        await strapi.services.submissions.create(dataSubmitted);
        return ({lowerEstimate:minPrice,upperEstimate:maxPrice});
    }

};
