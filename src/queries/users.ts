type GetUser = {
  description: 'Retrieves a single user.';
};

export const retrieveUserByUsername = async (username: string) => {
  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username],
  };

  const { rows: users } = await db.query(query);
  // the username column has a UNIQUE constraint, so this will never return more than one row.
  return users[0];
};
