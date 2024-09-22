// config.ts
// type Config = {
//   development: {
//     apiUrl: string;
//   };
//   production: {
//     apiUrl: string;
//   };
// };

// const config: Config = {
//   development: {
//     apiUrl: 'http://localhost:3000/',
//   },
//   production: {
//     apiUrl: 'https://baby-gift-nextjs.vercel.app/',
//   },
// };

const env = process.env.ENV;
// console
// const supabaseKey = process.env;


const getConfig = () => {

  console.log("envirement", env);
  if (env == 'production') {
    return "https://baby-gift-nextjs.vercel.app/";
  }
  return "https://baby-gift-nextjs.vercel.app/";
};

export default getConfig;