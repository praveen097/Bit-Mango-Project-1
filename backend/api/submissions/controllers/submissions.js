'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(submission){
        let minPrice = 0;
        let maxPrice = 0;
        let answeredQuestions = submission.request.body.answeredQuestions;
        answeredQuestions.forEach(questions => {
            questions.options.forEach((option)=>{
                minPrice += option.minPrice;
                maxPrice += option.maxPrice;
            })
        });
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
