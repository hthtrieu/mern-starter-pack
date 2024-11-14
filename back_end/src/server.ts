import app from './app';

const port = process.env.PORT || 8000;
app.listen(Number(port), '0.0.0.0', () => {
  console.log(
    `server is running on http://localhost:${process.env.PORT || 8000}`,
  );
});
app.get('/', (req, res) => {
  res.send('Server is running');
});
