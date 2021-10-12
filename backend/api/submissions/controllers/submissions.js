'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    console.log("In Create");
    let entity;
    let minPrice = 0;
    let maxPrice = 0;
    let answeredQuestions = ctx.request.body.answeredQuestions;
    answeredQuestions.forEach(question => {
     question.options.forEach((option)=>{
       minPrice+=option.minPrice;
       maxPrice+=option.maxPrice;
     })
   });
    let submitData = {
      email:ctx.request.body.email,
      companyName:ctx.request.body.companyName,
      answeredQuestions:answeredQuestions,
      lowerEstimate:minPrice,
      upperEstimate:maxPrice,
    }
   entity = await strapi.services.submissions.create(submitData);
   return submitData;
  }
};
