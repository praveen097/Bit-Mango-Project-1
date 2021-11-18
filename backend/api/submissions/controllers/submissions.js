"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
var nodeMailer = require("nodemailer");
var handleBars = require("handlebars");
var fs = require("fs");
var path = require("path");
var transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "testpraveen097@gmail.com",
    pass: "Pravtest321@",
  },
});

module.exports = {
  async create(submission) {
    var source = fs.readFileSync(
      path.join(__dirname, "../../../assets/mail.hbs"),
      "utf8"
    );
    var template = handleBars.compile(source);
    let minPrice = 0;
    let maxPrice = 0;
    let answeredQuestions = submission.request.body.answeredQuestions;
    answeredQuestions.forEach((questions) => {
      questions.options.forEach((option) => {
        minPrice += option.minPrice;
        maxPrice += option.maxPrice;
      });
    });
    var mailOptions = {
      to: submission.request.body.email,
      subject: "Cost Estimator - Answered Questions",
      attachments: [
        {
          filename: "logo.png",
          path: __dirname + "/assets/logo.png",
          cid: "lemonLogo",
        },
        {
          filename: "facebook.png",
          path: __dirname + "/assets/facebook.png",
          cid: "facebook",
        },
        {
          filename: "instagram.png",
          path: __dirname + "/assets/instagram.png",
          cid: "instagram",
        },
        {
          filename: "linkedin.png",
          path: __dirname + "/assets/linkedin.png",
          cid: "linkedin",
        },
        {
          filename: "twitter.png",
          path: __dirname + "/assets/twitter.png",
          cid: "twitter",
        },
        {
          filename: "logo-icon.png",
          path: __dirname + "/assets/logo-icon.png",
          cid: "logoIcon",
        },
        {
          filename: "road21.png",
          path: __dirname + "/assets/road21.png",
          cid: "road21",
        },
      ],
      html: template({
        companyName: submission.request.body.companyName,
        questions: answeredQuestions,
        lowerEstimate: minPrice,
        upperEstimate: maxPrice,
      }),
    };

    await transporter.sendMail(mailOptions);
    let dataSubmitted = {
      email: submission.request.body.email,
      companyName: submission.request.body.companyName,
      lowerEstimate: minPrice,
      upperEstimate: maxPrice,
      answeredQuestions: answeredQuestions,
    };
    await strapi.services.submissions.create(dataSubmitted);
    return { lowerEstimate: minPrice, upperEstimate: maxPrice };
  },
};
