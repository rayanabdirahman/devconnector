import bootstrapApp from './app';

const runApp = async () => {
  const PORT = process.env.PORT || 9000;
  const app = await bootstrapApp();

  app.listen(PORT, () => console.log(`App is running on PORT: ${PORT}`));

  return app; 
}

(async () => await runApp())();
