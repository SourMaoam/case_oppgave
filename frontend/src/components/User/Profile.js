import React, { useEffect } from "react";
import useUserStore from "../../store/useUserStore";

function Profile() {
  const user = useUserStore((state) => state.user);
  const fetchUserProfile = useUserStore((state) => state.fetchUserProfile);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <strong>Email:</strong> {user.email}
    </div>
  );
}

export default Profile;
