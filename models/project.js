module.exports = db => {
  const all = () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM projects;")
        .then(({ rows }) => {
          resolve(rows);
        })
        .catch(err => reject(err));
    });

  const find = id =>
    new Promise((resolve, reject) => {
      const query = `SELECT * FROM projects WHERE id = $1 LIMIT 1;`;
      const values = [id];

      db.query(query, values)
        .then(({ rows }) => {
          const project = rows[0];

          if (project) {
            resolve(project);
          } else {
            reject(`Cannot find project with id: ${id}`);
          }
        })
        .catch(err => reject(err));
    });

  return {
    all,
    find
  };
};
