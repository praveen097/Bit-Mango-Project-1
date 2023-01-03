module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  //When deploying set the public url of the nginx container here:
  url: 'http://localhost:4200/api',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '16bad48cf07dd997d618da8ec9fcf18d'),
    },
  },
});
