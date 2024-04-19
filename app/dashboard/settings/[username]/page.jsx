import { updateUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { connectToDB } from "@/app/lib/utils";
import { User } from "@/app/lib/models";

export const fetchUserId = async (username) => {
  console.log(username);
  try {
    connectToDB();
    const user = await User.findOne({
      username: username
    });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

const SingleUserPage = async ({ params }) => {
  
  const { username } = params;
  const user = await fetchUserId(username);
  console.log(user);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user._id}/>
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>Yes</option>
            <option value={false} selected={!user.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>Yes</option>
            <option value={false} selected={!user.isActive}>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
