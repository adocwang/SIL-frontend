export default (function() {

  const env = process.env.NODE_ENV;

  // console.log(123333, env, ~['production', 'staging'].indexOf(env));

  return {
    isProduction: ['production', 'staging'].indexOf(env) > -1
  };

})();
