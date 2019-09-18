module.exports = db => {
  const all = () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM projects;")
        .then(({ rows }) => {
          resolve(rows);
        })
        .catch(err => reject(err));
    });

  return {
    all
  };
};
