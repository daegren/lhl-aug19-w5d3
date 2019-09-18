module.exports = db => {
  const findByProject = projectId =>
    new Promise((resolve, reject) => {
      const query = "SELECT * FROM tasks WHERE project_id = $1;";
      const values = [projectId];

      db.query(query, values)
        .then(({ rows }) => {
          resolve(rows);
        })
        .catch(err => reject(err));
    });

  return {
    findByProject
  };
};
